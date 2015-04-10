var mongoose = require('mongoose');
var mongodb = require('util/credential')('mongodb');
var db = mongoose.createConnection(mongodb);

var CompanySchema = new mongoose.Schema({
  name: {
    type: String,
  	required : true
  },
  industry: String,
  id: Number,
  annualSale: Number,
  numberOfEmployees: Number,
  reputation: [{
    userId: String,
    wageLevel: Number,
    workingHours: Number,
    holidayWork: Number,
    paidVacationDegestion: Number
  }],
});
var CompanyModel = db.model('Company', CompanySchema );

module.exports = CompanyModel;
