var express = require('express');
var path = require('path');
var http = require('http');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var passport = require('passport');

var credentialSession = require('util/credential')('session');
var logger = require('util/logger').getLogger('app');

var route = require('route/');
var routeAccount = require('route/account');
var routeApi = require('route/api');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'jade');
app.set('port', process.env.PORT || 3000);
app.locals.pretty = true;

app.use(express.static(path.join(__dirname, 'asset/public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(session({
  secret: credentialSession,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// Routing
app.use('/', route);
app.use('/account', routeAccount);
app.use('/api', routeApi);

app.use(function(req, res, next) {
  'use strict';
  var userId = req.session.passport.user;
  logger.info('user-id:' + userId);
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  'use strict';
  logger.info(err);
  res.status(err.status || 500);
  res.render('error', {
      message: err.message
  });
});

server.listen(app.get('port'), function () {
    'use strict';
    logger.info('Express server listening on port ' + server.address().port);
  }
);

io.sockets.on('connection', function (socket) {
  'use strict';
	socket.emit('event', {});
});
