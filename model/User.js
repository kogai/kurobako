var mongodb;

switch (process.env.env){
  case 'dev':
    mongodb = require('../credential').mongodb;
    break;
  case 'heroku':
    mongodb = process.env.mongodb;
    break;
}

var mongoose = require('mongoose');
var db = mongoose.createConnection(mongodb);
var schema = new mongoose.Schema({
  author: Array,
  title: Array,
  publisher: Array,
  publicationDate: Array,
  price: Array,
  url: Array,
  isKindlized: Boolean,
});
var model = db.model('Booklists', schema );

module.exports = model;
