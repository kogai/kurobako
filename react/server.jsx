var React = require('react');
var Index = require('./index');
var Router = require('react-router');
var logger = require('util/logger').getLogger('reactServer');
var renderToStringAsync = require('react-async').renderToStringAsync;

module.exports = function (req, res) {
  var userId = req.session.passport.user;
  logger.info('user-id:' + userId);

  Router.run(Index, function (Handler) {
    renderToStringAsync(<Handler/>, function (err, markup) {
      res.render('index', { bundle: markup })
    });
  });
};
