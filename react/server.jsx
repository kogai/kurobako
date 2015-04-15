var React = require('react');
var Index = require('./index');
var Router = require('react-router');

module.exports = function (req, res) {
  Router.run(Index, function (Handler) {
    var bundle = React.renderToString(<Handler/>);
    res.render('index', { bundle: bundle })
  });
};


// React.renderToString(<Index/>);
/*
app.use(function (req, res) {
  // pass in `req.path` and the router will immediately match
  Router.run(routes, req.path, function (Handler) {
    var markup = React.renderToString(<Handler/>);
    res.render('index', {markup: markup});
  });
});
*/
