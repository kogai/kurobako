var express = require('express');
var router = express.Router();
var verify = require('route/account/verify');
var regist = require('route/account/regist');
var login = require('route/account/login');
var localPassport = login.localPassport;
var bundle = require('asset/react/server');
var logger = require('util/logger').getLogger('route');
var hashToken = require('util/crypt').hashToken;

router.post('/login',
  localPassport.authenticate('local', { failureRedirect: '/account/fail' }), function(req, res) {
    'use strict';
    var userId = req.session.passport.user;
    hashToken(userId)
    .done(function (token) {
      logger.info('user-id:' + userId + ' token:' + token + ' logined.');
      res.send(token);
    });
  }
);

router.post('/logout', function(req, res) {
  'use strict';
  delete req.session.passport.user;
  res.send('ログアウト完了しました。');
});

router.get('/verify', function(req, res) {
  'use strict';
  verify({
    res: res,
    req: req
  });
});

router.post('/regist', function(req, res) {
  'use strict';
  var userId = req.session.passport.user;
  logger.info(userId + ' logined.');
  regist(userId);
});

router.get('/', function(req, res) {
  'use strict';
  res.render('account', {
    title: 'アカウント',
    bundle: bundle
  });
});

module.exports = router;
