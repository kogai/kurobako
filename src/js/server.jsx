var React = require('react');
var Btn = require('asset/server/component/util/Btn');
var Login = require('asset/server/component/account/Login');
var Regist = require('asset/server/component/account/Regist');

var Index = React.createClass({
  // getInitialState: function () {
  //   return {
  //     log: console.log('getInitialState')
  //   }
  // },
  // componentWillMount: function () {
  // },
  render: function () {
    return (
      <div>
        <h1>Hello, server.</h1>
        <Login />
        <Regist />
      </div>
    );
  }
});

module.exports = React.renderToString(<Index />);
