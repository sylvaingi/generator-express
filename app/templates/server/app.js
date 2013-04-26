'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');

var app = express();

app.set('port', process.env.PORT || 3000);

app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.set('layout', 'layout');
app.engine('html', require('hogan-express'));

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(app.router);

if ('development' === app.get('env')) {
    app.use(express.errorHandler());

    app.use(express.static(path.join(__dirname, '../client')));
    app.use(express.static(path.join(__dirname, '../.tmp')));
}

if ('production' === app.get('env')) {
    app.use(express.static(path.join(__dirname, 'public')));
}

app.use(function (req, res, next){
    res.status(404);
    res.render('404', { url: req.url });
});

app.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.render('500', { error: err });
});

var controllerDirectory = __dirname + '/controllers';
fs.readdirSync(controllerDirectory).forEach(function (file) {
    require(controllerDirectory + '/' + file)(app);
});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
