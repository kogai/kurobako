var React = require('react');

var Btn = React.createClass({
  render: function () {
    return (
      <div method={this.props.method} uri={this.props.uri} >
        {this.props.name}
      </div>
    );
  }
});

module.exports = Btn;
