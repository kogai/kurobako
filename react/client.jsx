var React = require('react');
var Index = require('./index');
var Router = require('react-router');


Router.run(Index, function (Handler) {
  React.render(<Handler/>, document.body);
});

// React.render(<Index/>, document.body);
