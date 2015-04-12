var logger = require('util/logger').getLogger('route');
var bundle = require('asset/public/server.js');
var company = require('route/company');
var account = require('route/account');

module.exports = {
  root: {
    method: 'GET',
    path: '/',
    handler: function ( req, reply ) {
      'use strict';
      reply.view('index', {
        title: 'Home',
        bundle: bundle
      });
    }
  },
  asset: {
    method: 'GET',
    path: '/asset/{param*}',
    handler: {
      directory: {
        path: './asset/public'
      },
    }
  },
  notFound: {
    method: '*',
    path: '/{param*}',
    handler: function (req, reply) {
      'use strict';
      logger.info('404 Not Found.');
      reply.view('404', {
        title: '404 Not Found.'
      });
    }
  },
  company: company,
  account: account,
};
