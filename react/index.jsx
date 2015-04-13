var React = require('react');
var Login = require('./component/account/Login');
var Regist = require('./component/account/Regist');

module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <Login />
        <Regist />
      </div>
    );
  }
});
