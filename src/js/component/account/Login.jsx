var React = require('react');
var Btn = require('asset/server/component/util/Btn');

var Login = React.createClass({
  render: function () {
    return (
      <Btn method='post' uri='/account/login' name='ログイン' />
    );
  }
});

module.exports = Login;
