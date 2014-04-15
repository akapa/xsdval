module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('bower.json'),
    requirejs: {
      compile: {
        options: {
          baseUrl: 'js',
          exclude: ['underscore', 'objTools', 'XsdLibrary', 'xml', 'xsd', 'text', 'wgxpath', 'primitiveUnserializers'],
          paths: {
              underscore: 'lib/underscore',
              text: 'lib/text',
              xsd: 'lib/xsd',
              xml: 'lib/xml',
              primitiveUnserializers: 'lib/primitiveUnserializers',
              Library: 'lib/Library',
              XsdLibrary: 'lib/XsdLibrary',
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
        src: ["./js/", "./js/nodeValidator", './js/XsdLibrary', 'README.md'],
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
    }
  });

  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'requirejs', 'jsdoc']);

};