'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var ExpressGenerator = module.exports = function ExpressGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        this.installDependencies({ skipInstall: options['skip-install'] });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(ExpressGenerator, yeoman.generators.NamedBase);

ExpressGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    // welcome message
    var welcome =
    '\n     _-----_' +
    '\n    |       |' +
    '\n    |' + '--(o)--'.red + '|   .--------------------------.' +
    '\n   `---------´  |    ' + 'Welcome to Yeoman,'.yellow.bold + '    |' +
    '\n    ' + '( '.yellow + '_' + '´U`'.yellow + '_' + ' )'.yellow + '   |   ' + 'ladies and gentlemen!'.yellow.bold + '  |' +
    '\n    /___A___\\   \'__________________________\'' +
    '\n     |  ~  |'.yellow +
    '\n   __' + '\'.___.\''.yellow + '__' +
    '\n ´   ' + '`  |'.red + '° ' + '´ Y'.red + ' `\n';

    console.log(welcome);

    var prompts = [{
        name: 'cloud',
        message: 'Is this app going to be deployed on a Paas (Cloudfoundry, Appfog, etc.)?',
        default: 'Y/n'
    },{
        name: 'includeSassLibs',
        message: 'Would you like some additional SASS librairies?',
        default: 'Y/n'
    }];

    this.prompt(prompts, function (err, props) {
        if (err) {
            return this.emit('error', err);
        }

        this.cloud = (/y/i).test(props.cloud);
        this.includeSassLibs = (/y/i).test(props.includeSassLibs);

        cb();
    }.bind(this));
};

ExpressGenerator.prototype.gruntfile = function gruntfile() {
    this.template('Gruntfile.js');
};

ExpressGenerator.prototype.packageJSON = function packageJSON() {
    this.template('_package.json', 'package.json');
};

ExpressGenerator.prototype.git = function git() {
    this.copy('gitignore', '.gitignore');
    this.copy('gitattributes', '.gitattributes');
};

ExpressGenerator.prototype.bower = function bower() {
    this.copy('bowerrc', '.bowerrc');
    this.copy('_bower.json', 'bower.json');
};

ExpressGenerator.prototype.jshint = function jshint() {
    this.copy('jshintrc', '.jshintrc');
};

ExpressGenerator.prototype.editorConfig = function editorConfig() {
    this.copy('editorconfig', '.editorconfig');
};

ExpressGenerator.prototype.cfManifests = function cfManifests() {
    if (this.cloud) {
        this.template('cf.yml', 'manifests/cf.yml');
        this.template('appfog.yml', 'manifests/appfog.yml');
    }
};

ExpressGenerator.prototype.mainStylesheet = function mainStylesheet() {
    if (this.includeSassLibs) {
        this.directory('sass', 'client/styles/libs');
        this.write('client/styles/main.scss', '@import "compass";\n@import "compass/css3";\n@import "compass/reset";\n\n@import "libs/animations";\n@import "libs/media-queries";');
    }else {
        this.write('client/styles/main.scss', '@import "compass";\n@import "compass/css3";\n@import "compass/reset";');
    }
};

ExpressGenerator.prototype.app = function app() {
    this.directory('client');
    this.mkdir('client/styles');
    this.mkdir('client/views');
    this.mkdir('client/images');
    this.directory('server');

    if (this.cloud) {
        this.mkdir('manifests');
    }
};
