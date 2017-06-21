'use strict';

var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');
var kssConfig = require('./kss-config');

module.exports = function (inputSource, options, callback) {
  var args = [];

  args.push('./node_modules/.bin/kss');

  // Load default config file
  Promise.resolve(kssConfig()).then(function (filePath) {
    if (filePath) {
      args.push(`--config="${filePath}"`);
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
        args.push(`--config="${options.config}"`);
      }
    } else {
       if (typeof options.title === 'string') {
          args.push(`--title="${options.title}"`);
        }

        if (options.mask) {
          args.push(`--mask="${options.mask}"`);
        }

        if (options.markup) {
          args.push(`--markup=${options.markup}`);
        }

        if (options['nav-depth']) {
          args.push(`--nav-depth=${options['nav-depth']}`);
        }

        if (options.placeholder) {
          args.push(`--placeholder="${options.placeholder}"`);
        }

        if (options.source) {
          args.push(`--source="${options.source}"`);
        }

        if (options.destination) {
          args.push(`--destination="${options.destination}"`);
        }

        if (options.builder) {
          args.push(`--builder="${options.builder}"`);
        }

        if (options.extend) {
          args.push(`--extend="${options.extend}"`);
        }

        if (options.custom) {
          args.push(`--custom="${options.custom}"`);
        }

        if (options.homepage) {
          args.push(`--homepage="${options.homepage}"`);
        }

        if (options.css) {
          args.push(`--css="${options.css}"`);
        }

        if (options.js) {
          args.push(`--js=${options.js}`);
        }
    }

    args.push(';');

    console.log(args);
    
    exec(args.join(' '), {
      cwd: process.cwd()
    }, function (e, stdout) {
      if (e instanceof Error) {
        callback(`kss loader error: ${e}`);
      } else {
        console.info(stdout);

        callback(e, {
          stdout: stdout,
          source: inputSource
        });
      }
    });
  });
};
