var Dispatcher = require('./Dispatcher');
var Constant = require('./Constant');
var request = require('superagent');
var cookie = require('react-cookie');

module.exports = {
  postEnything: function () {
    Dispatcher.dispatch({
      actionType: Constant.POST_PRE,
    });
  },
  postRegist: function (obj) {
    var _self = this;
    request
      .post(obj.uri)
      .send({
        mail: obj.mail,
        password: obj.password
      })
      .end(function(err, res){
        if(err){
          _self.postError(err);
          return;
        }
        var token;
        try{
          token = JSON.parse(res.text).token;
          console.log('token', token);
          cookie.save('token', token);
        }catch(error){
          token = null;
          _self.postError(error);
        }finally{
          Dispatcher.dispatch({
            actionType: Constant.POST_REGIST,
            token: token
          });
        }
     });
  },
  postError: function (error) {
    console.log(error);
  },
  getCompanies: function (companies) {
    console.log('companies.length', companies.length);
    Dispatcher.dispatch({
      actionType: Constant.GET_COMPANIES,
      companies: companies
    });
  }
};
