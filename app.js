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

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'jade');
app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'public')));

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

app.use('/', route);

app.use(function(req, res, next) {
    'use strict';
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

server.listen(
  app.get('port'),
  function () {
    'use strict';
    logger.info('Express server listening on port ' + server.address().port);
  }
);

io.sockets.on('connection', function (socket) {
  'use strict';
	socket.emit('event', {});
});
