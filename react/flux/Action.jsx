var Dispatcher = require('./Dispatcher');
var Constant = require('./Constant');

module.exports = {
  postEnything: function (obj) {
    Dispatcher.dispatch({
      actionType: Constant.POST,
      method: obj.method,
      uri: obj.uri,
      name: obj.name
    });
  }
};
