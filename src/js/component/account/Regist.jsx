var React = require('react');
var Btn = require('asset/server/component/util/Btn');

var Regist = React.createClass({
  render: function () {
    return (
      <Btn method='post' uri='/account/regist' name='新規登録' />
    );
  }
});

module.exports = Regist;
