var Dispatcher = require('./Dispatcher');
var Constant = require('./Constant');
var request = require('superagent');
var cookie = require('react-cookie');

module.exports = {
  postEnything: function () {
    Dispatcher.dispatch({
      actionType: Constant.POST_PRE,
    });
  },
  postRegist: function (obj) {
    request
      .post(obj.uri)
      .send({
        mail: obj.mail,
        password: obj.password
      })
      .end(function(err, res){
        if(err){
          console.log(err);
        }
        var token = res.text;
        cookie.save('token', token);
        Dispatcher.dispatch({
          actionType: Constant.POST_REGIST,
          token: token
        });
     });
  }
};
