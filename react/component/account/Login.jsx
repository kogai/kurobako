var React = require('react');
var Btn = require('../../component/util/Btn');

var Login = React.createClass({
  render: function () {
    return (
      <Btn method='post' uri='/account/login' name='ログイン' />
    );
  }
});

module.exports = Login;
