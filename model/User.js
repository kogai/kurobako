var mongoose = require('mongoose');
var mongodb = require('util/credential')('mongodb');
var db = mongoose.createConnection(mongodb);
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = require('util/CONSTANT').SALT_WORK_FACTOR;
var logger = require('util/logger').getLogger('User');
var Q = require('q');

var hashPassword = function(next) {
  'use strict';
  var user = this;
  if (!user.isModified('password')){
    return next();
  }

  var generateSalt = function() {
    var d = Q.defer();
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) {
        logger.info(err);
        return next(err);
      }

      d.resolve(salt);
    });
    return d.promise;
  };

  var hashPassword = function(salt) {
    var d = Q.defer();
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) {
        logger.info(err);
        return next(err);
      }
      user.password = hash;
      d.resolve(hash);
    });
    return d.promise;
  };

  generateSalt()
  .then(hashPassword)
  .done(function(hash) {
    next();
  });
};

var comparePassword = function(candidatePassword, hashedPassword, callBack) {
  'use strict';
  bcrypt.compare(candidatePassword, hashedPassword, function(err, isMatch) {
    if (err) {
      logger.info(err);
      return callBack(err);
    }
    callBack(null, isMatch);
  });
};

var UserSchema = new mongoose.Schema({
  mail: {
    type: String,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
  	required : true
  },
  verifyId: String,
  isVerified: Boolean,
  lastModified: Date,
  career: [{
    companyId: String,
    companyName: String
  }]
});
UserSchema.methods.comparePassword = comparePassword;
UserSchema.pre('save', hashPassword);

var UserModel = db.model('Users', UserSchema );

module.exports = UserModel;
