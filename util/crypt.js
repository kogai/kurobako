var logger = require('util/logger').getLogger('util');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = require('util/CONSTANT').SALT_WORK_FACTOR;
var Q = require('q');

var hashToken = function(token) {
  'use strict';
  token = token.toString();
  var def = Q.defer();
  var generateSalt = function() {
    var d = Q.defer();
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) {
        logger.info(err);
      }
      d.resolve(salt);
    });
    return d.promise;
  };
  var hashPassword = function(salt) {
    var d = Q.defer();
    bcrypt.hash(token, salt, function(err, hash) {
      if (err) {
        logger.info(err);
      }
      d.resolve(hash);
    });
    return d.promise;
  };
  generateSalt()
  .then(hashPassword)
  .done(function(hash) {
    def.resolve(hash);
  });
  return def.promise;
};

var compareToken = function(candidatePassword, hashedPassword, callBack) {
  'use strict';
  bcrypt.compare(candidatePassword, hashedPassword, function(err, isMatch) {
    if (err) {
      logger.info(err);
      return callBack(err);
    }
    callBack(null, isMatch);
  });
};

module.exports = {
  hashToken: hashToken,
  compareToken: compareToken
};
