module.exports = function(property){
  'use strict';
  var credential;
  console.log('process.env.env', process.env.env);
  switch (process.env.env){
    case 'ci':
      credential = process.env;
      break;
    case 'heroku':
      credential = process.env;
      break;
    default:
      credential = require('credential');
      break;
  }
  return credential[property];
};
