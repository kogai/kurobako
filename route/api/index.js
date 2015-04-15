var express = require('express');
var router = express.Router();
var logger = require('util/logger').getLogger('route');
var ModelCompany = require('model/Company');
var LIST_PER_PAGE = require('util/CONSTANT').LIST_PER_PAGE;

router.get('/', function(req, res) {
  logger.info(req.session.passport.user);
  res.send({

  });
});

router.get('/list', function (req, res) {
  var query = ModelCompany
  .find({})
  .limit(LIST_PER_PAGE);
  query.exec(function (err, companies) {
    if(err){
      logger.info(err);
    }
    res.send(companies);
  })
});

module.exports = router;
