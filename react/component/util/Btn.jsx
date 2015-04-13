var React = require('react');
var Store = require('../../flux/Store');

var Btn = React.createClass({
  getInitialState: function () {

  },
  componentWillMount: function () {

  },
  _postEvent: function () {

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
