'use strict';

var loaderUtils = require('loader-utils');
var validateOptions = require('schema-utils');
var schema = require('./schema');
var runKss = require('./lib/run-kss');

module.exports = function (source) {
  var options = Object.assign({}, loaderUtils.getOptions(this), {});

  if (this.cacheable) {
    this.cacheable();
  }

  // Validate options
  var validation = validateOptions(schema, options, 'KSS Loader');

  if (!validation) {
    throw new Error(validation.error);
  }

  var callback = this.async();

  // Start the rendering
  runKss(source, options, function (err, result) {
    if (result) {
      callback(null, result.source);
    } else {
      callback(err);
      return;
    }
  });
};
