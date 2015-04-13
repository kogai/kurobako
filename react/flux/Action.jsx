var Dispatcher = require('./Dispatcher');
var Constant = require('./Constant');
var request = require('superagent');

module.exports = {
  postEnything: function (obj) {
    Dispatcher.dispatch({
      actionType: Constant.POST_PRE,
    });
    console.log(obj.uri);
    request
      .post(obj.uri)
      .end(function(err, res){
        if(err){
          return console.log(err);
        }
        Dispatcher.dispatch({
          actionType: Constant.POST_FETCH,
        });
     });
  }
};
