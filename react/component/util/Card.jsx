var React = require('react');

var Card = React.createClass({

  render: function() {
    return (
      <div>
        <a href="/company/{this.props.pageId}">
          { this.props.name }
        </a>
      </div>
    );
  }

});

module.exports = Card;
