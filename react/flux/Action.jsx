var Dispatcher = require('./Dispatcher');
var Constant = require('./Constant');
var request = require('superagent');

module.exports = {
  postEnything: function () {
    Dispatcher.dispatch({
      actionType: Constant.POST_PRE,
    });
  },
  postRegist: function (obj) {
    console.log(obj.uri);
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
        console.log(res);
        Dispatcher.dispatch({
          actionType: Constant.POST_REGIST
        });
     });
  }
};
