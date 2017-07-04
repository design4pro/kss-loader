'use strict';

var fs = require('fs');
var path = require('path');
var kss = require('kss');
var kssConfig = require('./kss-config');

module.exports = function (inputSource, options, callback) {
  var args = {};

  // Load default config file
  Promise.resolve(kssConfig()).then(function (config) {
    if (config) {
      args = config;
    } else if (options.config) {
      try {
        var configFile = require(path.resolve(
          process.cwd(),
          options.config
        ));
      } catch (err) {
        callback(`kss loader error: ${options.config} not found`);
      }

      if (configFile) {
        args = configFile;
      }
    } else {
       if (typeof options.title === 'string') {
          args.title = options.title;
        }

        if (options.mask) {
          args.mask = options.mask;
        }

        if (options.markup) {
          args.markup = options.markup;
        }

        if (options['nav-depth']) {
          args['nav-depth'] = options['nav-depth'];
        }

        if (options.placeholder) {
          args.placeholder = options.placeholder;
        }

        if (options.source) {
          args.source = options.source;
        }

        if (options.destination) {
          args.destination = options.destination;
        }

        if (options.builder) {
          args.builder = options.builder;
        }

        if (options.extend) {
          args.extend = options.extend;
        }

        if (options.custom) {
          args.custom = options.custom;
        }

        if (options.homepage) {
          args.homepage = options.homepage;
        }

        if (options.css) {
          args.css = options.css;
        }

        if (options.js) {
          args.js = options.js;
        }
    }

    kss(args).then(function (error) {
      if (error instanceof Error) {
        callback(error);
      } else {
        callback(null, {
          source: inputSource
        });
      }
    });
  });
};
