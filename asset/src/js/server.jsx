var React = require('react');
var http = require('http');

var Index = React.createClass({
  getInitialState: function () {
    return {
      log: console.log('getInitialState')
    }
  },
  componentWillMount: function () {
    console.log('componentWillMount');
    process.nextTick(function(){
      console.log('componentWillMount Async');
    });
  },
  render: function () {
    console.log('render');
    return (
      <h1>Hello, server.</h1>
    );
  }
});

module.exports = React.renderToString(<Index />);
