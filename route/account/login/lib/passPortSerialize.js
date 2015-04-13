var modelUser = require('model/User');

var serialize = function( user, done ) {
  'use strict';
  done( null, user._id );
};

var deSerialize = function( id, done ) {
  'use strict';
  modelUser.findById( id, function( err, user ) {
    done( err, user );
  });
};

module.exports = {
  serialize: serialize,
  deSerialize: deSerialize
};
