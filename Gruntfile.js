module.exports = function (grunt) {

  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({

    uglify: {
      dist: {
        files: {
          'jquery.cbgetmaps.min.js': 'jquery.cbgetmaps.js'
        }
      }
    },

    watch: {
      js: {
        files: 'jquery.cbgetmaps.js',
        tasks: ['uglify']
      }
    },

    jshint: {
      all: ['jquery.cbgetmaps.js']
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['uglify']);
  grunt.registerTask('hint', ['jshint']);

};