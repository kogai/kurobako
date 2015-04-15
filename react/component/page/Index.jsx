var React = require('react');
var ReactAsync = require('react-async');
var request = require('superagent');

var Action = require('../../flux/Action');
var Store = require('../../flux/Store');

module.exports = React.createClass({
  mixins: [ ReactAsync.Mixin ],
  getInitialState: function () {
    return Store.getState();
  },
  getInitialStateAsync: function (callback) {
    this._getCompany(callback);
  },
  _getCompany: function (callback) {
    var _self = this;
    request
    .post('http://localhost:3000/api/company/')
    .send({
      pageId: this.props.params.pageId
    })
    .end(function (err, res) {
      if(err){
        console.log(err);
        callback(err);
      }
      var company;
      try{
        company = res.body;
      }catch(e){
        company = {};
      }
      _self._company = company;
      Action.getCompanies(company);
      callback(null, company);
    });
  },
  _company: {},
  render: function() {
    var company = this._company;
    return (
      <div>
        社名:{ company.name }
        業種:{ company.industry }
        年商:{ company.annualSale }万円
        従業員数:{ company.numberOfEmployees }
      </div>
    );
  }
});

/*
- page - >
  - graph ->

CompanyModel
  name: {
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
