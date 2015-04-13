var React = require('react');
var Store = require('../../flux/Store');
var Action = require('../../flux/Action');

var Btn = React.createClass({
  getInitialState: function () {
    console.log('getInitialState');
    return Store.getState();
  },
  componentWillMount: function () {
    this.setState({
      isPosting: Store.getState().isPosting
    });
  },
  _postEvent: function () {
    console.log('_postEvent');
    if(!this.state.isPosting){
      Action.postEnything({
        method: this.props.method,
        uri: this.props.uri,
        name: this.props.name
      });
    }
  },
  render: function () {
    return (
      <div method={this.props.method} uri={this.props.uri} onClick={this._postEvent} >
        {this.props.name}
      </div>
    );
  }
});

module.exports = Btn;
