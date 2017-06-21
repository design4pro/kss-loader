'use strict';

var findup = require('findup');
var fs = require('fs');
var path = require('path');
var log = require('winston');
var KSS_CONFIG = 'kss-config.json';

module.exports = function () {
  var promise = new Promise(function (resolve, reject) {
    findup(process.cwd(), KSS_CONFIG, function (err, filePath) {
      if (err) {
        log.info('Unable to find a configuration file. Please refer to documentation to learn how to ser up: https://github.com/design4pro/kss-loader#readme"');
        resolve(false);

        return;
      }

      fs.readFile(path.join(filePath, KSS_CONFIG), function (readError, content) {
        if (readError) {
          log.info('Unable to read a configuration file. Please refer to documentation to learn how to ser up: https://github.com/design4pro/kss-loader#readme"');
          resolve(false);

          return;
        }

        resolve(path.join(filePath, KSS_CONFIG));
      });
    });
  });

  return promise;
};
