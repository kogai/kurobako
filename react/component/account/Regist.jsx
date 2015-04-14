var React = require('react');
var VerifyForm = require('../../component/account/VerifyForm');

module.exports = React.createClass({
  render: function () {
    return (
      <VerifyForm uri='/account/regist' name='新規登録' />
    );
  }
});
