module.exports = function(property){
  var credential;
  switch (process.env.env){
    case 'ci':
      credential = process.env;
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
