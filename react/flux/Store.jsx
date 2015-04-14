var Dispatcher = require('./Dispatcher');
var Constant = require('./Constant');

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var cookie = require('react-cookie');

var CHANGE_EVENT = 'change';
// EventEmitter.prototype.setMaxListeners(100);

// STATE
var _contents = [];
var _isFetching = false;
var _isNotPosting = true;
var _isLogined = false;
var _token = cookie.load('token') || undefined;

var togglePostingState = function () {
  _isNotPosting = !_isNotPosting;
};

var postRegist = function (token) {
  _isLogined = true;
  _token = token;
};

var Store = assign({}, EventEmitter.prototype, {
  getState: function () {
    return {
      contents: _contents,
      isFetching: _isFetching,
      isNotPosting: _isNotPosting,
      isLogined: _isLogined,
      token: _token,
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
      togglePostingState();
      Store.emitChange();
      break;

    case Constant.POST_REGIST:
      togglePostingState();
      postRegist(action.token);
      Store.emitChange();
      break;
  }
});

module.exports = Store;
