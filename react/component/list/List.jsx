var React = require('react');
var request = require('superagent');
var Promise = require('es6-promise').Promise;
var AsyncState = require('react-router').AsyncState;

var Card = require('../../component/util/Card');

var List = React.createClass({
  mixins: [AsyncState],
  statics:{
    getInitialAsyncState: function (path, query, setState) {
      console.log('getInitialAsyncState');
      return new Promise(function (resolve, reject) {
        request
        .get('/api/list')
        .end(function (err, res) {
          if(err){
            reject(err);
          }
          console.log(res);
          setState({
          });
          resolve();
        });
      });
    }
  },
  render: function() {
    console.log('render');
    return (
      <div>
        <Card name='DummyACompany' pageId='1000' />
      </div>
    );
  }

});

module.exports = List;

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

/** @jsx React.DOM
var React = require("react");
var Promise = require('es6-promise').Promise;
var AsyncState = require('react-router').AsyncState;

var SurveyTable = require('./survey_table');

var ListSurveys = React.createClass({
  mixins:[AsyncState],

  statics:{
    getInitialAsyncState: function(path, query, setState){
      return new Promise(function(resolve, reject){
        setTimeout(function () {
          setState({
            surveys:[
              {
                id: 'asd123',
                uri: 'asd123',
                editUri: 'ad123',
                title: 'Superhero is mashup',
                publishedDate: new Date(),
                modifiedDate: new Date(),
                activity: [121,32,54,12,546]
              }
            ]
          })
          resolve();
        }, 5000);
      });
    }
  },

  render: function(){
    if(!this.state.surveys){
      return <div>Loading ... </div>
    }

    return (
      <div className='list-surveys'>
        <h1>Active Surveys</h1>
        <SurveyTable surveys={this.state.surveys}/>
      </div>
    );
  }
});

module.exports = ListSurveys;
*/
