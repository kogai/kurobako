module.exports = function (data) {
  'use strict';

  var Q = require('q');
  var modelUser = require('model/User');
  var logger = require('util/logger').getLogger('route');

  var verifyAndModifyUser = function (data) {
    var d = Q.defer();
    var req = data.req;
    var verifyId = req.query.id;

    modelUser.findOneAndUpdate({
      verifyId: verifyId
    }, {
      isVerified: true
    }, function (err, user) {
      if (err) {
        console.log(err);
      }
      data.user = user;
      d.resolve(data);
    });
    return d.promise;
  };

  var renderRouter = function(data) {
    var res = data.res;
    var d = Q.defer();

    res.redirect(303, '/');
    d.resolve(data);

    return d.promise;
  };

  verifyAndModifyUser(data)
  .then(renderRouter)
  .done(function (data) {
    logger.info(data);
  });
};
