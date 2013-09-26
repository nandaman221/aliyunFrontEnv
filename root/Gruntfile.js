'use strict';

module.exports = function(grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // project configuration.
    grunt.initConfig({
        // metadata
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            overall: {
                src: ['js/**/*.js']
            }
        },
        concat: {
            specific: {
                options: {
                    separator: ';',
                    banner: '// file begin',
                    footer: '//file end'
                },
                files:[
                    {src: ['srcpath'], dest: 'destpath', nonull: true}
                ]
            }
        },
        uglify: {
            specific: {
                options: {
                    beautify: false,    //格式化代码，包括函数定义提前等等，但变量名缩短还是会做，默认false
                    compress: {
                        global_defs: {
                            DEBUG: false        //非常给力的配置，可以让uglify忽略if(变量){}的代码
                        },
                        dead_code: true         //非常给力的配置，去除不能被调用到的局部变量，全局方法和变量不会被去除
                    },
                    report: 'gzip',      //压缩信息，有false，min，gzip，默认false
                    sourceMap: 'map/uglify-sourcemap.js'
                },
                files:[
                    {src: ['srcpath'], dest: 'destpath', nonull: true}
                ]
            }
        },
        clean: {
            svn: {
                src: ['./css', './js', './images']
            },
            map: {
                src: ['./map']
            }
        },
        watch: {
            options: {
                livereload: true                //默认false，可以为true或者是端口号如2013
            },
            overall: {
                files: ['css/**/*.css']
            },
            js: {
                files: ['js/**/*.js']
            }
//        tasks: ['jshint']
        },
        connect: {
            options: {
                port: '80',
                hostname: '*'
            },
            livereload: {
                options: {
                    base: './',
                    livereload: true
                }
            }
        },
        open: {
            index: {
                path: 'http://127.0.0.1:<%= connect.options.port %>/demo',
                app: 'Google Chrome'
            }
        },
        svn_fetch: grunt.file.readJSON('svn.json')
    });

    // Default task.
    grunt.registerTask('default', [
        'connect:livereload', 'open:index', 'watch'
    ]);
    grunt.registerTask('release', [
        'connect:livereload:keepalive'
    ]);
    // Get SVN resources.
    grunt.registerTask('getsvn', [
        'clean:svn', 'svn_fetch'
    ]);
};
