var express = require('express');
var router = express.Router();
var logger = require('util/logger').getLogger('route');
var reactServer = require('asset/react/server');

router.get('/', reactServer );

module.exports = router;
