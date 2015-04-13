var Q = require('q');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var modelUser = require('model/User');

var LocalStrategyField = {
  usernameField: 'mail',
  passwordField: 'password'
};

var LocalStrategyCallBack = function(mail, password, done) {
  'use strict';
  var fetchUser = function(mail, password, done) {
    var d = Q.defer();
    modelUser.findOne({
      mail: mail
    }, function(err, user) {
      if (err) {
        console.log('LocalStrategyCallBackのエラー', err);
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: 'ユーザーIDが間違っています。'
        });
      }
      d.resolve({
        password: password,
        user: user
      });
    });
    return d.promise;
  };

  var comparePassword = function(data) {
    var requestedPassword = data.password;
    var user = data.user;

    user.comparePassword(requestedPassword, user.password, function(err, isMatch) {
      if (err) {
        return done(err);
      }
      if (isMatch) {
        return done(null, user);
      }
      return done(null, false, {
        message: 'パスワードが間違っています。'
      });
    });
  };

  fetchUser(mail, password, done)
  .then(comparePassword);
};

passport.use(
  new LocalStrategy(LocalStrategyField, LocalStrategyCallBack)
);

module.exports = passport;
