var React = require('react');
var Btn = require('./component/util/Btn');
var Login = require('./component/account/Login');
var Regist = require('./component/account/Regist');

var Index = React.createClass({
  render: function () {
    return (
      <div>
        <h1>Hello, browser.</h1>
        <Login />
        <Regist />
      </div>
    );
  }
});

React.render(<Index />, document.body);
