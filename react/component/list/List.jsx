var React = require('react');
var ReactAsync = require('react-async');
var request = require('superagent');

var Action = require('../../flux/Action');
var Store = require('../../flux/Store');
var Card = require('../../component/util/Card');

var List = React.createClass({
  mixins: [ ReactAsync.Mixin ],
  getInitialState: function () {
    console.log('getInitialState');
    return Store.getState();
  },
  getInitialStateAsync: function (callback) {
    console.log('getInitialStateAsync');
    this._getInitialAsyncState(callback);
  },
  componentDidMount: function () {
    this._getInitialAsyncState(function(err, companies){});
    Store.addChangeListener(this._getAsyncState);
  },
  _getAsyncState: function () {
    this.setState({
      companies: Store.getState().companies
    });
  },
  _getInitialAsyncState: function (callback) {
    var _self = this;
    request
    .get('http://localhost:3000/api/list')
    .end(function (err, res) {
      if(err){
        console.log(err);
        callback(err);
      }
      var companies;
      try{
        companies = res.body;
      }catch(e){
        companies = [];
      }
      _self.setState({
        companies: companies
      });
      _self._companies = companies;
      Action.getCompanies(companies);
      callback(null, companies);
    });
  },
  _companies: [],
  render: function () {
    var Companies;
    console.log('this.state.companies.length', this.state.companies.length);
    console.log('this._companies.length', this._companies.length);
    if(this._companies === 0 ){
      Companies = "<EmptyWrapper />";
    }else{
      Companies = this._companies.map(function (company) {
        console.log(company.name);
        return (
          <Card
            name={company.name}
            key={ company.pageId }
            pageId={ company.pageId }
            industry={ company.industry }
            annualSale={ company.annualSale }
            numberOfEmployees={ company.numberOfEmployees }
            reputation={ company.reputation }
          />
        );
      });
    }
    return (
      <ul>
        { Companies }
      </ul>
    );
  }
});

module.exports = List;
