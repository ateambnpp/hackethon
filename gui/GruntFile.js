module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat:  {
            options: {
                seperator: ';'
            },
            dist: {
                src: ['app/**/*.js'],
                dest: 'dist/hack-gui.js'
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'services/**/*.js',  'app/**/*.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        less: {
            development: {
                options: {
                    paths: ["stylesheets"],
                    yuicompress: true
                },
                files: {
                    "stylesheets/style.css": "stylesheets/style.less"
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>','tests/**/*Spec.js','lib/**/*.js','stylesheets/*.less'],
            tasks: ['jshint','concat' ,'less']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['jshint','less']);
    grunt.registerTask('test', ['jshint', 'concat']);
};