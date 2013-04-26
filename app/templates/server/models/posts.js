var db = require('./lib/db');

var posts = db.collection('posts');

module.exports = posts;