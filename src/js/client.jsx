var React = require('react');
var Btn = require('./component/util/Btn.jsx');

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
