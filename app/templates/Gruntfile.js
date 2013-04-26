// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var yeomanConfig = {
        client: 'client',
        server: 'server',
        dist: 'dist',
        distClient: '<%= yeoman.dist %>/public'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
            coffee: {
                spawn: true,
                files: ['<%= yeoman.client %>/scripts/{,*/}*.coffee'],
                tasks: ['coffee:dist']
            },
            coffeeTest: {
                spawn: true,
                files: ['test/spec/{,*/}*.coffee'],
                tasks: ['coffee:test']
            },
            compass: {
                spawn: true,
                files: ['<%= yeoman.client %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass']
            },
            express: {
                files: ['<%= yeoman.server %>/{,*/}*.js', '!<%= yeoman.server %>/test/{,*/}*.js'],
                tasks: ['express-server', 'livereload']
            },
            clientTest: {
                spawn: true,
                files: ['<%= yeoman.client %>/test/spec/{,*/}*.js'],
                tasks: ['connect:test', 'mocha']
            },
            serverTest: {
                spawn: true,
                files: ['<%= yeoman.server %>/test/{,*/}*.js'],
                tasks: ['simplemocha']
            },
            livereload: {
                files: [
                    '<%= yeoman.client %>/*.html',
                    '{.tmp,<%= yeoman.client %>}/styles/{,*/}*.css',
                    '{.tmp,<%= yeoman.client %>}/scripts/{,*/}*.js',
                    '<%= yeoman.client %>/images/{,*/}*.{png,jpg,jpeg,webp}',
                    '<%= yeoman.server %>/{,*/}*.html'
                ],
                tasks: ['livereload']
            }
        },
        server: {
            script: 'server/app.js'
        },
        connect: {
            options: {
                port: 9000,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            test: {
                options: {
                    port: 9001,
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'client/test')
                        ];
                    }
                }
            },
            dist: {}
        },
        open: {
            server: {
                path: 'http://localhost:3000'
            }
        },
        clean: {
            dist: ['.tmp', '<%= yeoman.dist %>/*'],
            server: '.tmp'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.client %>/scripts/{,*/}*.js',
                '!<%= yeoman.client %>/scripts/vendor/*',
                '<%= yeoman.client %>/test/spec/{,*/}*.js',
                '<%= yeoman.server %>/{,*/}*.js'
            ]
        },
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://localhost:<%= connect.test.options.port %>/index.html']
                }
            }
        },
        simplemocha: {
            all: {
                options: {
                    timeout: 3000,
                    ignoreLeaks: false,
                    ui: 'bdd',
                    reporter: 'nyan',
                    growl: true
                },
                src: '<%= yeoman.server %>/test/{,*/}*.js'
            }
        },
        coffee: {
            dist: {
                files: [{
                    // rather than compiling multiple files here you should
                    // require them into your main .coffee file
                    expand: true,
                    cwd: '<%= yeoman.client %>/scripts',
                    src: '*.coffee',
                    dest: '.tmp/scripts',
                    ext: '.js'
                }]
            },
            test: {
                files: [{
                    expand: true,
                    cwd: '.tmp/spec',
                    src: '*.coffee',
                    dest: '<%= yeoman.client %>/test/spec'
                }]
            }
        },
        compass: {
            options: {
                sassDir: '<%= yeoman.client %>/styles',
                cssDir: '.tmp/styles',
                imagesDir: '<%= yeoman.client %>/images',
                javascriptsDir: '<%= yeoman.client %>/scripts',
                fontsDir: '<%= yeoman.client %>/styles/fonts',
                importPath: '<%= yeoman.client %>/components',
                relativeAssets: true
            },
            dist: {},
            server: {
                options: {
                    debugInfo: true
                }
            }
        },
        // not used since Uglify task does concat,
        // but still available if needed
        /*concat: {
            dist: {}
        },*/
        uglify: {
        },
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.distClient %>/scripts/{,*/}*.js',
                        '<%= yeoman.distClient %>/styles/{,*/}*.css',
                        '<%= yeoman.distClient %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                        '<%= yeoman.distClient %>/styles/fonts/*'
                    ]
                }
            }
        },
        useminPrepare: {
            html: '<%= yeoman.server %>/views/layout.html',
            options: {
                dest: '<%= yeoman.distClient %>'
            }
        },
        usemin: {
            html: ['<%= yeoman.distClient %>/{,*/}*.html', '<%= yeoman.dist %>/views/{,*/}*.html'],
            css: ['<%= yeoman.distClient %>/styles/{,*/}*.css'],
            options: {
                basedir: '<%= yeoman.distClient %>'
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.client %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.distClient %>/images'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.client %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= yeoman.distClient %>/images'
                }]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= yeoman.distClient %>/styles/main.css': [
                        '.tmp/styles/{,*/}*.css',
                        '<%= yeoman.client %>/styles/{,*/}*.css'
                    ]
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.client %>',
                    src: '*.html',
                    dest: '<%= yeoman.distClient %>'
                },
                {
                    cwd: '<%= yeoman.server %>/views',
                    src: '*.html',
                    dest: '<%= yeoman.dist %>/views'
                }]
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.client %>',
                    dest: '<%= yeoman.distClient %>',
                    src: [
                        '*.{ico,txt}'
                    ]
                },
                {
                    expand: true,
                    cwd: '<%= yeoman.server %>',
                    src: ['**/*', '!test/**/*', '!test'],
                    dest: '<%= yeoman.dist %>'
                }]
            },
            manifests: {
                expand: true,
                cwd: 'manifests',
                src: '*.yml',
                dest: '<%= yeoman.dist %>'
            }
        },
        npmsw: {
            all: {
                options: {
                    dir: '<%= yeoman.dist %>'
                }
            }
        },
        concurrent: {
            server: [
                'coffee:dist',
                'compass:server'
            ],
            test: [
                'coffee',
                'compass'
            ],
            dist: [
                'coffee',
                'compass:dist',
                'imagemin',
                'svgmin',
                'htmlmin'
            ]
        }
    });

    grunt.renameTask('regarde', 'watch');

    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            process.env.NODE_ENV = 'production';

            grunt.config.set('server.script', 'dist/app.js');
            return grunt.task.run(['build', 'express-server', 'open', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'express-server',
            'livereload-start',
            'open',
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'simplemocha',
        'concurrent:test',
        'connect:test',
        'mocha'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'concurrent:dist',
        'cssmin',
        'concat',
        'uglify',
        'copy',
        'rev',
        'usemin'
    ]);

    grunt.registerTask('dist', function (target) {
        var tasks = ['jshint', 'test', 'build'];

        if (target === 'cloud') {
            tasks.push('npmsw', 'copy:manifests');
        }

        return grunt.task.run(tasks);
    });

    grunt.registerTask('default', ['server']);

    grunt.registerMultiTask('npmsw', function () {
        var done = this.async();

        var dir = this.data.options.dir;

        var packageJson = grunt.file.readJSON('package.json');
        delete packageJson.devDependencies;

        packageJson = JSON.stringify(packageJson, null, '\t');
        grunt.file.write(dir + '/package.json', packageJson);

        var spawnNpmCommand = function (command, callback) {
            var cp = grunt.util.spawn({
                cmd: 'npm',
                args: [command],
                opts : {cwd: dir}
            }, callback);

            if (grunt.option('verbose')) {
                cp.stdout.pipe(process.stdout);
                cp.stderr.pipe(process.stderr);
            }
        };

        grunt.util.async.series([
            function (callback) { spawnNpmCommand('install', callback); },
            function (callback) { spawnNpmCommand('shrinkwrap', callback); }
        ],
        function (err, results) {
            if (err) {
                grunt.log.writeln(err);
            }

            done(!!!err);
        });
    });
};
