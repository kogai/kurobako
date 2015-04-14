var React = require('react');

module.exports = React.createClass({
  _style: {
    'color': '#c00',
    "fontSize": "10px"
  },
  render: function () {
    return (
      <div style={ this._style }>{ this.props.message }</div>
    );
  }
});
