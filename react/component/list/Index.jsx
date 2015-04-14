var React = require('react');
var Card = require('../../component/util/Card');

var Index = React.createClass({

  render: function() {
    return (
      <div>
        <Card name='DummyCompany' pageId='1000' />
      </div>
    );
  }

});

module.exports = Index;

/*
- list
  - map ->

CompanyModel

  name: {
    type: String,
  	required : true
  },
  industry: String,
  pageId: {
    type: Number,
    required: true,
    index: {
      unique: true
    }
  },
  annualSale: Number,
  numberOfEmployees: Number,
  reputation: [{
    userId: String,
    wageLevel: String,
    workingHours: String,
    holidayWork: Number,
    paidVacationDegestion: Number
  }]

*/
