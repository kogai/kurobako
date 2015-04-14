var express = require('express');
var router = express.Router();
var logger = require('util/logger').getLogger('route');
var bundle = require('asset/react/server');

router.get('/', function(req, res) {
  'use strict';
  res.render('index', {
    title: 'Home',
    bundle: bundle
  });
});

module.exports = router;
