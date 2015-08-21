module.exports = function(grunt) {

  grunt.initConfig({
    //-----------------------------------------------------
    jshint: {     // Validate .js file syntax
      all: [
        'server/**/*.js',   // server files
        'www/**/*.js'    // client files
      ],
      options: {
        force: 'true',
        jshintrc: '.jshintrc',
        ignores: [
          'www/dist/**/*.js'
        ]
      }
    },
    //-----------------------------------------------------
    mochaTest: {  // Run spec tests
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },
    //-----------------------------------------------------
    concat: {     // Join .js files
      src: {
        src: 'www/app/**/*.js',
        dest: 'www/dist/src.js',
      },
      lib: {
        src: [
          'bower_components/angular/angular.min.js',
          'bower_components/angular-route/angular-route.min.js',
          'bower_components/jquery/dist/jquery.min.js',
          'bower_components/ng-table/dist/ng-table.min.js',
          'bower_components/angular-jwt/dist/angular-jwt.min.js',
          'bower_components/angular-ui-router/release/angular-ui-router.min.js',
          'bower_components/ng-file-upload/ng-file-upload.js',
          'bower_components/bootstrap/dist/js/bootstrap.min.js'
        ],
        dest: 'www/dist/lib.min.js',
      }
    },
    //-----------------------------------------------------
    uglify: {     // Minify .js files
      options: {
          mangle: false
        },
        js_files: {
          files: {
            'www/dist/src.min.js': ['www/dist/src.js'],
            'www/dist/cytoscape.min.js': ['bower_components/cytoscape/dist/cytoscape.js']
          }
        }
    },
    //-----------------------------------------------------
    cssmin: {     // Minify .css files
      target: {
        files: [{
          expand: true,
          cwd: 'bower_components/bootstrap/dist/css/',
          src: ['bootstrap.css', '!*.min.css'],
          dest: 'www/dist/',
          ext: '.min.css'
        }]
      },
      stylesheet: {
        files: [{
          expand: true,
          cwd: 'www/styles/',
          src: ['styles.css', '!*.min.css'],
          dest: 'www/dist/',
          ext: '.min.css'
        }]
      },
      ngTable: {
        files: [{
          expand: true,
          cwd: 'bower_components/ng-table/dist/',
          src: ['ng-table.css', '!*.min.css'],
          dest: 'www/dist/',
          ext: '.min.css'
        }]
      }
    },
    //-----------------------------------------------------
    nodemon: {    // Start server
      dev: {
        script: 'server/server.js'
      }
    },
    //-----------------------------------------------------
    shell: {
      delsrc: {
        command: 'rm ./www/dist/src.js'
      }
    },
    //-----------------------------------------------------
    watch: {
      scripts: {
        files: [
          'server/**/*.js',   // server files
          'www/**/*.js'    // www files
        ],
        tasks: ['build']
      },
      css: {
        files: 'www/styles/*.css',
        tasks: ['cssmin']
      }
    }
  });

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('server-dev', function (target) {
    // Running nodejs in a different process and displaying output on the main console
    var nodemon = grunt.util.spawn({
         cmd: 'grunt',
         grunt: true,
         args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run(['watch']);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'jshint',
    'mochaTest'
  ]);

  grunt.registerTask('build', [
    'test',
    'concat',
    'uglify',
    'shell:delsrc',
    'cssmin'
  ]);

  // grunt.registerTask('upload', function(n) {
  //   if(grunt.option('git')) {
  //     // add support for git push
  //   } else {
  //     grunt.task.run([ 'server-dev' ]);
  //   }
  // });

  // grunt.registerTask('deploy', [
  //     'build',
  //     'upload'
  // ]);
};