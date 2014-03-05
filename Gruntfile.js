module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('bower.json'),
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        background: true,
        autoWatch: false
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: 'js',
          exclude: ['underscore', 'objTools', 'Library', 'xml', 'xsd', 'text', 'wgxpath'],
          paths: {
              underscore: 'lib/underscore',
              text: 'lib/text',
              xsd: 'lib/xsd',
              xml: 'lib/xml',
              Library: 'lib/Library',
              objTools: 'lib/objTools',
              wgxpath: 'lib/wgxpath',
              xsdval: '.'
          },
          name: 'XmlValidator',
          skipModuleInsertion: false,
          optimize: 'none',
          out: 'dist/xsdvalidator.js',
          onBuildWrite: function (moduleName, path, contents) {
            return module.require('amdclean').clean(contents);
          },
          wrap: {
            startFile: 'js/dist_start.js.frag',
            endFile: 'js/dist_end.js.frag'
          }
        }
      }
    },
    jsdoc: {
      dist: {
        src: ["./js/", "./js/nodeValidator"],
        options: {
          destination: "./docs/",
          tags: {
              "allowUnknownTags": true
          },
          templates: {
              cleverLinks: true,
              monospaceLinks: false
          }
        }
      }
    },
    jshint: {
      options: {
        ignores: ['js/lib/*.js']
      },
      all: ['Gruntfile.js', 'js/*.js', 'js/nodeValidator/*.js', 'test/*.js']
    },
    watch: {
      //run unit tests with karma (server needs to be already running)
      karma: {
        files: ["js/**/*.js", "test/*.js"],
        tasks: ["karma:unit:run"]
      }
    }
  });

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'requirejs', 'jsdoc']);

};