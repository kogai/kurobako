var React = require('react');

var Router = require('react-router');

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var Login = require('./component/account/Login');
var Regist = require('./component/account/Regist');

var Index = React.createClass({
  render: function () {
    return (
      <div>
        <Login />
        <Regist />
      </div>
    );
  }
});

var App = React.createClass({
  render: function () {
    return (
      <RouteHandler />
    );
  }
});

var routes = (
  <Route name="app" path="/" handler={ App }>
    <Route name="account" handler={ Regist }/>
    <DefaultRoute handler={ Index }/>
  </Route>
);

module.exports = routes ;
