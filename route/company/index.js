var bundle = require('asset/public/server.js');

module.exports = {
  root: {
    method: 'GET',
    path: '/company/',
    handler: function ( req, reply ) {
      'use strict';
      reply.view('index', {
        title: 'Company',
        bundle: bundle
      });
    }
  }
};
