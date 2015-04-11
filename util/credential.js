module.exports = function(property){
  var credential;
  switch (process.env.env){
    case 'dev':
      credential = require('../credential');
      break;
    case 'heroku':
      credential = process.env;
      break;
    default:
      credential = require('../credential');
      break;
  }
  return credential[property];
};
