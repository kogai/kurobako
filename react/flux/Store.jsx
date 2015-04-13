var Dispatcher = require('./Dispatcher');
var Constant = require('./Constant');

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
// EventEmitter.prototype.setMaxListeners(100);

// STATE
var _contents = [];
var _isFetching = false;
var _isNotPosting = true;

var togglePostingState = function () {
  _isNotPosting = !_isNotPosting;
};

var postRegist = function () {
  console.log('postRegist');
};

var Store = assign({}, EventEmitter.prototype, {
  getState: function () {
    return {
      contents: _contents,
      isFetching: _isFetching,
      isNotPosting: _isNotPosting
    };
  },
  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  }
});

Dispatcher.register(function(action){
  switch(action.actionType){
    case Constant.POST_PRE:
      console.log(action.actionType);
      togglePostingState();
      Store.emitChange();
      break;
    case Constant.POST_REGIST:
      console.log(action);
      postRegist();
      togglePostingState();
      Store.emitChange();
      break;
  }
});

module.exports = Store;
