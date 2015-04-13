var React = require('react');
var Btn = require('./component/util/Btn.jsx');

var Index = React.createClass({
  render: function () {
    return (
      <h1>"Hello, browser."</h1>
    );
  }
});

React.render(<Index />, document.body);
