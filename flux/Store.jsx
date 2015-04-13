var Dispatcher = require('./Dispatcher.jsx');
var Constants = require('./Constants.jsx');

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
// EventEmitter.prototype.setMaxListeners(100);

// STATE
var _contents = [];
var _isFetching = false;

function fetchContent (contents) {
  _contents = contents;
  _isFetching = false;
  _page = 1;
}

var AppStore = assign({}, EventEmitter.prototype, {
  getState: function(){
    return {
      contents: _contents,
      isFetching: _isFetching
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
    case Constants.SPOT_CATEGORIES:
      fetchContent(action.contents);
      AppStore.emitChange();
      break;
    default:
      break;
  }
});

module.exports = AppStore;
