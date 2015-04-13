var React = require('react');
var Btn = require('src/js/component/util/Btn.jsx');

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
        <Btn method='post' uri='/account/regist' name='アカウント登録' />
      </div>
    );
  }
});

module.exports = React.renderToString(<Index />);
