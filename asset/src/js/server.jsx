var React = require('react');
var reactAsync = require('react-async');
var renderToStringAsync = reactAsync.renderToStringAsync
var http = require('http');

var Index = React.createClass({
  getInitialState: function () {
    return {
      log: console.log('getInitialState')
    }
  },
  componentWillMount: function () {
  },
  render: function () {
    return (
      <h1>Hello, server.</h1>
    );
  }
});

module.exports = React.renderToString(<Index />);
