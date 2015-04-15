var React = require('react');
var Store = require('./flux/Store');

var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var Login = require('./component/account/Login');
var Regist = require('./component/account/Regist');
var List = require('./component/list/List');
var Page = require('./component/page/Index');

var IsNotLogined = React.createClass({
  render: function () {
    return (
      <div>
        <Login />
        <Regist />
      </div>
    );
  }
});

var IsLogined = React.createClass({
  render: function () {
    return (
      <div>Logined.</div>
    );
  }
});

var Index = React.createClass({
  getInitialState: function () {
    return Store.getState();
  },
  componentDidMount: function () {
    Store.addChangeListener(this._getState);
  },
  _getState: function () {
    this.setState({
      token: Store.getState().token
    });
  },
  render: function () {
    var renderState;
    if(this.state.token){
      renderState = <IsLogined />;
    }else{
      renderState = <IsNotLogined />;
    }
    return (
      <div>{ renderState }</div>
    );
  }
});

var App = React.createClass({
  render: function () {
    return (
      <div>
        <List />
        <RouteHandler {...this.props} />
      </div>
    );
  }
});

var routes = (
  <Route name="app" path="/" handler={ App }>
    <Route name="page" path="/page/:pageId" handler={ Page } />
    <DefaultRoute handler={ Index }/>
  </Route>
);

module.exports = routes ;
