var Dispatcher = require('./Dispatcher');
var Constant = require('./Constant');

module.exports = {
  accountRegist: function (uri, page) {
    Dispatcher.dispatch({
      actionType: Constant.ACCOUNT_LOGIN
    });
  }
};
