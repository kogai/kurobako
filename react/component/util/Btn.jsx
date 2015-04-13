var React = require('react');
var Store = require('../../flux/Store');
var Action = require('../../flux/Action');

var Btn = React.createClass({
  getInitialState: function () {
    return Store.getState();
  },
  componentDidMount: function () {
    Store.addChangeListener(this._getState);
  },
  _getState: function () {
    this.setState({
      isNotPosting: Store.getState().isNotPosting
    });
  },
  _postEvent: function (event) {
    if(this.state.isNotPosting){
      Action.postEnything();
    }
    if(this.props.func && this.state.isNotPosting){
      this.props.func({
        method: this.props.method,
        uri: this.props.uri,
        name: this.props.name
      });
    }
  },
  render: function () {
    return (
      <button method={ this.props.method } uri={ this.props.uri } onClick={ this._postEvent } >
        { this.props.name }
      </button>
    );
  }
});

module.exports = Btn;
