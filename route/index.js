var express = require('express');
var router = express.Router();
var logger = require('util/logger').getLogger('route');
var bundle = require('asset/server/server');

router.get('/', function(req, res) {
  'use strict';
  var isLogined = req.session.passport.user;
  if (isLogined) {
    res.render('index', {
      title: 'Home',
      bundle: bundle
    });
  } else {
    res.redirect(303, '/account');
  }
});

router.get('/account', function( req, res ) {
  'use strict';
	res.render( 'account', {
		title: 'Account',
    bundle: bundle
	});
});

module.exports = router;
