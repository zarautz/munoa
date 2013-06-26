'use strict';

var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist',
        build: 'build',
        pkg: grunt.file.readJSON('package.json')
    };

    try {
        yeomanConfig.app = require('./component.json').appPath || yeomanConfig.app;
    } catch (e) {}

    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
            compass: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass']
            },
            livereload: {
                files: [
                    '<%= yeoman.app %>/{,*/}*.html',
                    '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
                    '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ],
                tasks: ['livereload']
            }
        },
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            },
            test: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'test')
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                url: 'http://localhost:<%= connect.options.port %>'
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.build %>/<%= yeoman.build %>.zip',
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js'
            ]
        },
        karma: {
            unit: {
                options: {
                    configFile: 'karma.conf.js',
                    singleRun: true
                }
            },
            cloudunit: {
                options: {
                    configFile: 'karma-c9.conf.js',
                    singleRun: true
                }
            }
        },
        compass: {
            options: {
                sassDir: '<%= yeoman.app %>/styles/scss',
                cssDir: '<%= yeoman.app %>/styles',
                imagesDir: '<%= yeoman.app %>/images',
                javascriptsDir: '<%= yeoman.app %>/scripts',
                fontsDir: '<%= yeoman.app %>/styles/fonts',
                importPath: '<%= yeoman.app %>/components',
                relativeAssets: true,
                require: 'zurb-foundation'
            },
            dist: {},
            server: {
                options: {
                    debugInfo: true
                }
            }
        },
        concat: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/scripts/scripts.js': [
                        '.tmp/scripts/{,*/}*.js',
                        '<%= yeoman.app %>/scripts/{,*/}*.js'
                    ]
                }
            }
        },
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                dirs: ['<%= yeoman.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/styles/styles.css': [
                        '.tmp/styles/{,*/}*.css',
                        '<%= yeoman.app %>/styles/{,*/}*.css'
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
                    cwd: '<%= yeoman.app %>',
                    src: ['*.html', 'views/*.html'],
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },
        cdnify: {
            dist: {
                html: ['<%= yeoman.dist %>/*.html']
            }
        },
        ngmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>/scripts',
                    src: '*.js',
                    dest: '<%= yeoman.dist %>/scripts'
                }]
            }
        },
        uglify: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/scripts/scripts.js': [
                        '<%= yeoman.dist %>/scripts/scripts.js'
                    ]
                }
            }
        },
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/styles/{,*/}*.css',
                        '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                        '<%= yeoman.dist %>/styles/fonts/*'
                    ]
                }
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,txt}',
                        'config.xml',
                        'manifest.webapp',
                        '.htaccess',
                        '!components/**/*',
                        'images/{,*/}*.{gif,webp}',
                        'styles/fonts/*'
                    ]
                }]
            }
        },
        compress: {
            dist: {
                options: {
                    archive: '<%= yeoman.build %>/<%= yeoman.build %>.zip',
                    mode: 'zip'
                },
                files: [
                    // http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically
                    {
                        expand: true,
                        cwd: '<%= yeoman.dist %>',
                        src: '**',
                        isFile: true
                    }
                ]
            }
        },
        'phonegap-build': {
            upload: {
                options: {
                    archive: '<%= yeoman.build %>/<%= yeoman.build %>.zip',
                    appId: '448397',
                    timeout: 300000, // 5 minutes
                    user: {
                        email: 'team@illarra.com'
                    },
                    download: {
                        //winphone: '<%= yeoman.build %>/winphone.xap',
                        //symbian: '<%= yeoman.build %>/symbian.wgz',
                        //blackberry: '<%= yeoman.build %>/blackberry.cod',
                        //webos: '<%= yeoman.build %>/webos.ipk',
                        ios: '<%= yeoman.build %>/ios.ipa',
                        android: '<%= yeoman.build %>/android.apk'
                    }
                }
            },
        }
        /*
        exec: {
            phonegap: {
                cmd: 'curl -u illarra.bros@gmail.com -X PUT -F file=@./build.zip https://build.phonegap.com/api/v1/apps/448397'
            }
        },*/
    });

    grunt.renameTask('regarde', 'watch');

    grunt.registerTask('server', [
        'clean:server',
        'compass:server',
        'livereload-start',
        'connect:livereload',
        'open',
        'watch'
    ]);

    grunt.registerTask('test', [
        'clean:server',
        'connect:test',
        'karma:unit'
    ]);

    grunt.registerTask('c9test', [
        'clean:server',
        'karma:cloudunit'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        // Test Code
        'jshint',
        'test',
        // Prepare assets
        'assets',
        'compress'
    ]);

    grunt.registerTask('c9build', [
        'clean:dist',
        // Test Code
        'jshint',
        'c9test',
        // Prepare assets
        'assets'
    ]);

    grunt.registerTask('assets', [
        'compass:dist',
        'useminPrepare',
        'concat',
        'imagemin',
        'cssmin',
        'htmlmin',
        'copy',
        //'cdnify',
        'ngmin',
        'uglify',
        'rev',
        'usemin'
    ]);

    grunt.registerTask('phonegap', [
        'build',
        'phonegap-build:upload'
    ]);

    grunt.registerTask('default', ['build']);
};
