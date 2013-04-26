'use strict';

var posts = require('../models/posts');

var PostController = function (app) {
    app.get('/post', function (req, res) {
        posts.find({}).toArray(function (err, posts) {
            res.render('posts', { posts: posts });
        });
    });

    app.get('/post/:id', function (req, res){
        res.end('Post '+req.params.id);
    });
};

module.exports = PostController;
