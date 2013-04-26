'use strict';

var mongo = require('mongoskin');
var db = mongo.db('localhost:27017/express-seed', {safe: true});

module.exports = db;