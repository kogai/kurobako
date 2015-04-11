var should = require('should');

var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
mockgoose(mongoose);

var mongodb = require('util/credential')('mongodb');
var db = mongoose.createConnection(mongodb);
var Company = require('model/Company');

describe('Companyモデルのテスト', function () {
  'use strict';
  var newCompany;
  var newCompanyErrReslut;
  before(function (done) {
    newCompany = new Company({
      name: 'ダミー会社全部',
      industry: 'IT',
      pageId: 1,
      annualSale: 1000,
      numberOfEmployees: 25,
      reputation: [{
        userId: '55291c1f179cc8250f5afe73',
        wageLevel: "200~300",
        workingHours: '8~10',
        holidayWork: 2,
        paidVacationDegestion: 0.5
      }],
    });

    newCompany.save(function (newCompanyErr) {
      newCompanyErrReslut = newCompanyErr;
      done();
    });
  });

  it('Companyコレクションが見つかる', function (done) {
    Company.find({}, function(err, companies){
	    companies[0].should.have.property('name');
	    companies[0].should.have.property('industry');
	    companies[0].should.have.property('pageId');
	    companies[0].should.have.property('annualSale');
	    companies[0].should.have.property('numberOfEmployees');
	    companies[0].should.have.property('reputation');
      should(err).be.exactly(null);
      done();
    });
  });

  it('新しいModleが登録出来る', function (){
		newCompany.should.have.property('save');
    should(newCompanyErrReslut).be.exactly(null);
  });

  it('Modelに必要なプロパティがある', function () {
		newCompany.should.have.property('name');
		newCompany.should.have.property('industry');
		newCompany.should.have.property('pageId');
		newCompany.should.have.property('annualSale');
		newCompany.should.have.property('numberOfEmployees');
		newCompany.should.have.property('reputation');
  });

});
