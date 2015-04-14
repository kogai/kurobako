var Q = require('q');
var uuid = require('node-uuid');
var nodemailer = require('nodemailer');
var ModelUser = require('model/User');
var gmail = require('util/credential')('gmail');
var logger = require('util/logger').getLogger('route/regist');

var makeNewUserModel = function(data) {
  'use strict';
  var d = Q.defer();

  var verifyId = uuid.v1();
  var req = data.req;
  var mail = req.body.mail;
  var password = req.body.password;

  var newUser = new ModelUser({
    mail: mail,
    password: password,
    verifyId: verifyId,
    isVerified: false,
    lastModified: new Date(),
    career: []
  });

  data.verifyId = verifyId;
  data.mail = mail;
  data.password = password;
  data.newUser = newUser;

  newUser.save(function(err) {
    if (err) {
      data.isRegisterd = false;
      data.isRegisterdError = err;
      d.reject(data);
    } else {
      data.isRegisterd = true;
      d.resolve(data);
    }
  });
  return d.promise;
};

var makeMailTemplate = function (data) {
  'use strict';
  var d = Q.defer();
  var req = data.req;
  var verifyId = data.verifyId;
  var verifyLink = req.protocol + '://' + req.get('host') + "/account/verify?id=" + verifyId;

  var sendHtml = '';
  sendHtml += 'アカウント認証のために以下のURLをクリックして下さい。<br>';
  sendHtml += verifyLink;
  data.verifyLink = verifyLink;
  data.sendHtml = sendHtml;

  d.resolve(data);

  return d.promise;
};

var sendVerifyMail = function (data) {
  'use strict';
  var d = Q.defer();
  if (data.isRegisterd) {
    var mail = data.mail;
    var sendHtml = data.sendHtml;

    var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: gmail.user,
        pass: gmail.password
      }
    });

    var mailOptions = {
      from: 'kurobako ✔ <kogai0121@gmail.com>',
      to: mail,
      subject: 'kurobakoアカウント認証',
      text: sendHtml,
      html: sendHtml
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        logger.info(error);
      } else {
        logger.info('Message sent: ' + info.response);
      }
      d.resolve(data);
    });
  } else {
    d.resolve(data);
  }
  return d.promise;
};

var renderRouter = function (data) {
  'use strict';
  var res = data.res;
  var d = Q.defer();

  var statusMessage = 'アカウントの登録に成功しました。\n登録したメールアドレスに確認メールを送信しています。';
  res.send(statusMessage);
  d.resolve(data);

  return d.promise;
};

var renderFailRouter = function (data) {
  'use strict';
  console.log(data.isRegisterdError);
  var res = data.res;
  var d = Q.defer();
  var statusMessage = 'アカウントの登録に失敗しました。\n登録済みのメールアドレスです。';
  res.send(statusMessage);
  d.resolve(err);

  return d.promise;
};

module.exports = function (data) {
  'use strict';
  makeNewUserModel(data)
    .then(makeMailTemplate)
    .then(sendVerifyMail)
    .then(renderRouter)
    .fail(renderFailRouter)
    .done(function(data) {
      logger.info(data.isRegisterd);
    });
};
