'use strict';

var IndexController = function (app) {
    app.get('/', function (req, res) {
        res.render('index', { title: 'Express' });
    });
};

module.exports = IndexController;