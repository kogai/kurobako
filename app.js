var Hapi = require('hapi');
var server = new Hapi.Server();
var path = require('path');
var jade = require('jade');
var logger = require('util/logger').getLogger('app');
var route = require('route/index.js');

// Setting
server.connection({
  host: 'localhost',
  port: 3000
});

server.views({
    engines: {
      jade: jade
    },
    path: path.join(__dirname, 'view')
});

// Routing
server.route(route.asset);
server.route(route.root);
server.route(route.company.root);
server.route(route.account.root);
server.route(route.notFound);

// Running
server.start(function (err) {
  'use strict';
  if(err){
    logger.info(err);
  }
  logger.info('server running on ' + (process.env.PORT || server.info.port) + '...');
});
