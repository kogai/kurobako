var React = require('react');
var Store = require('../../flux/Store');
var Action = require('../../flux/Action');

module.exports = React.createClass({
  getInitialState: function () {
    return Store.getState();
  },
  componentDidMount: function () {
  },
  _handleChange: function (event) {
    // console.log(event);
  },
  render: function () {
    var value = this.state.value;
    return (
      <input type="text" value={ this.props.value } placeholder={ this.props.placeholder } onChange={this._handleChange}  />
    );
  }
});
