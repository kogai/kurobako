var React = require('react');
var Index = require('./index');
var Router = require('react-router');


Router.run(Index, function (Handler) {
  React.renderToString(<Handler/>);
});

// React.renderToString(<Index/>);
