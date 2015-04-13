var Dispatcher = require('./Dispatcher.jsx');
var Constants = require('./Constants.jsx');

module.exports = {
  fetchContent: function (uri, page) {
    Dispatcher.dispatch({
      actionType: Constants.SPOT_CATEGORIES_PRE,
      isFetching: true,
      isAddContents: false,
      uri: uri
    });
  }
};
