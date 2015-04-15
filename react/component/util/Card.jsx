var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Card = React.createClass({
  render: function() {
    var link = "/page/:" + this.props.pageId;
    return (
      <li>
        <Link to={ link } >
          { this.props.name }
        </Link>
      </li>
    );
  }

});

module.exports = Card;

/*
  name={company.name}
  industry={ company.industry }
  annualSale={ company.annualSale }
  numberOfEmployees={ company.numberOfEmployees }
  reputation={ company.reputation }

*/
