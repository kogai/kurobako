var React = require('react');

var Index = React.createClass({
  render: function() {
    return (
      <div />
    );
  }
});

/*
- add company-model
- change mail-address
- change password
- delete account

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

module.exports = Index;
