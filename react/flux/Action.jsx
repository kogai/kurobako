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
    console.log(obj);
    request
      .post(obj.uri)
      .end(function(err, res){
        if(err){
          return console.log(err);
        }
        console.log(res);
        Dispatcher.dispatch({
          actionType: Constant.POST_REGIST
        });
     });
  }
};
