var bundle = require('asset/public/server.js');

module.exports = {
  root: {
    method: 'GET',
    path: '/account/',
    handler: function ( req, reply ) {
      'use strict';
      reply.view('index', {
        title: 'Account',
        bundle: bundle
      });
    }
  }
};
