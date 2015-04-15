var React = require('react');

var Card = React.createClass({
  render: function() {
    var link = "/company/" + this.props.pageId;
    return (
      <div>
        <a href={ link }>
          { this.props.name }
        </a>
      </div>
    );
  }

});

module.exports = Card;
/*
  name={company.name}
  key={ company.pageId }
  industry={ company.industry }
  annualSale={ company.annualSale }
  numberOfEmployees={ company.numberOfEmployees }
  reputation={ company.reputation }

*/
