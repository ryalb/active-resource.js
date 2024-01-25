var babel = require('rollup-plugin-babel');

module.exports = function(grunt) {

  // configure the tasks
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      dist: {
        src: [ 'dist' ]
      },
      specs: {
        src: 'spec/spec.js'
      }
    },
    coffee: {
      build: {
        files: {
          'build/active-resource.js': [
            'src/active-resource.coffee',
            'src/modulizing.coffee',
            'src/typing.coffee',
            'src/resource_library.coffee',
            'src/interfaces/base.coffee',
            'src/interfaces/json_api.coffee',
            'src/associations.coffee',
            'src/attributes.coffee',
            'src/callbacks.coffee',
            'src/cloning.coffee',
            'src/collection.coffee',
            'src/collection_response.coffee',
            'src/errors.coffee',
            'src/fields.coffee',
            'src/links.coffee',
            'src/persistence.coffee',
            'src/query_params.coffee',
            'src/reflection.coffee',
            'src/relation.coffee',
            'src/core.coffee',
            'src/base.coffee',
            'src/associations/association.coffee',
            'src/associations/collection_association.coffee',
            'src/associations/collection_proxy.coffee',
            'src/associations/has_many_association.coffee',
            'src/associations/singular_association.coffee',
            'src/associations/has_one_association.coffee',
            'src/associations/belongs_to_association.coffee',
            'src/associations/belongs_to_polymorphic_association.coffee',
            'src/associations/builder/association.coffee',
            'src/associations/builder/collection_association.coffee',
            'src/associations/builder/has_many.coffee',
            'src/associations/builder/singular_association.coffee',
            'src/associations/builder/belongs_to.coffee',
            'src/associations/builder/has_one.coffee',
            'src/immutable.coffee',
            'src/immutable/attributes.coffee',
            'src/immutable/errors.coffee',
            'src/immutable/persistence.coffee',
            'src/immutable/base.coffee',
          ]
        }
      },
      specs: {
        files: {
          'spec/spec.js': [ 'spec/support/init.coffee', 'spec/support/*.coffee', 'spec/**/*.coffee' ]
        }
      }
    },
    rollup: {
      options: {
        plugins: [
          babel({
            exclude: './node_modules/**'
          })
        ]
      },
      build: {
        options: {
          format: 'umd',
          name: 'active-resource',
          moduleName: 'ActiveResource'
        },
        files: [{
          dest: 'build/active-resource.js',
          src: 'build/active-resource.js',
        }],
      },
      specs: {
        options: {
          format: 'umd',
          name: 'ActiveResourceSpecs',
        },
        files: [{
          dest: 'spec/spec.js',
          src: 'spec/spec.js',
        }],
      }
    },
    uglify: {
      release: {
        options: {
          mangle: false,
          sourceMap: true,
        },
        files: {
          'build/active-resource.min.js': 'build/active-resource.js'
        }
      }
    },
    concat: {
      release: {
        options: {
        },
        files: {
          'dist/active-resource.js': ['build/active-resource.js'],
          'dist/active-resource.min.js': ['build/active-resource.min.js'],
          'dist/active-resource.min.js.map': ['build/active-resource.min.js.map']
        }
      },
    }

  });

  // load the tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-rollup');

  grunt.registerTask(
    'build',
    'Compiles and runs the Javascript spec files for ActiveResource.js source code.',
    [ 'coffee:build', 'rollup:build', 'spec' ]
  );

  grunt.registerTask(
    'spec',
    'Compiles and runs the Javascript spec files for ActiveResource.js source code.',
    [ 'clean:specs', 'coffee:specs', 'rollup:specs' ]
  );

  grunt.registerTask(
    'travis',
    'Compiles and runs the Javascript spec files for ActiveResource.js source code specifically for Travis CI.',
    [ 'clean:specs', 'coffee:specs', 'rollup:specs', 'jasmine:travis' ]
  );

  grunt.registerTask(
    'release',
    'Creates a new release of the library in the dist folder',
    [ 'clean:dist', 'build', 'uglify:release', 'concat:release' ]
  );
};
