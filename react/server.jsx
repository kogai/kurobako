var React = require('react');
var Index = require('./index');
var Router = require('react-router');
var logger = require('util/logger').getLogger('reactServer');

module.exports = function (req, res) {
  var userId = req.session.passport.user;
  logger.info('user-id:' + userId);
  Router.run(Index, function (Handler) {
    var bundle = React.renderToString(<Handler/>);
    res.render('index', { bundle: bundle })
  });
};
