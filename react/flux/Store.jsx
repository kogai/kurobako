var Dispatcher = require('./Dispatcher');
var Constant = require('./Constant');
var Constant = require('./Constant');

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
// EventEmitter.prototype.setMaxListeners(100);

// STATE
var _contents = [];
var _isFetching = false;
var _isNotPosting = false;

var postPre = function () {
  _isNotPosting = true;
};

var Store = assign({}, EventEmitter.prototype, {
  getState: function(){
    return {
      contents: _contents,
      isFetching: _isFetching,
      isNotPosting: _isNotPosting
    };
  },
  emitChange: function(){
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback){
    this.on(CHANGE_EVENT, callback);
  }
});

Dispatcher.register(function(action){
  switch(action.actionType){
    case Constant.POST_PRE:
      postPre();
      Store.emitChange();
      break;
  }
});

module.exports = Store;
