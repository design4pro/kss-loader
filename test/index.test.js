'use strict';

var fs = require('fs');
var path = require('path');
var webpack = require("webpack");
var merge = require("webpack-merge");
var pathToKssLoader = require.resolve("./../index");
var testLoader = require("./tools/test-loader");
var kssLoader = require(pathToKssLoader);
var chai = require('chai');
var expect = chai.expect;

chai.should();

var CR = /\r/g;
var syntaxStyles = ["scss"];

syntaxStyles.forEach(function (ext) {
  function execTest(testId, options) {
    return new Promise(function (resolve, reject) {
      var baseConfig = merge({
        entry: path.join(__dirname, ext, testId + "." + ext),
        output: {
          filename: "bundle." + ext + ".js"
        },
        module: {
          rules: [{
            test: new RegExp(`\\.${ext}$`),
            use: [
              {
                loader: "raw-loader"
              },
              {
                loader: "sass-loader"
              },
              {
                loader: pathToKssLoader, 
                options: merge({
                  source: path.join(__dirname, ext),
                  destination: path.join(__dirname, ext, 'docs')
                }, options)
              }
            ]
          }]
        }
      });

      runWebpack(baseConfig, function (err) {
        return err ? reject(err) : resolve();
      });
    }).then(function () {
      var expectedCss = readCss(ext, testId);

      expectedCss.should.include('KSS Style Guide');
    });
  }

  describe(`sass-loader (${ext})`, function () {
    describe("basic", function () {
      it("should compile simple sass without errors", function () {
        return execTest("language");
      });
    });
  });
});

describe("sass-loader", function () {
  describe("source maps", function () {
    function buildWithSourceMaps() {
      return new Promise(function (resolve, reject) {
        runWebpack({
          entry: path.join(__dirname, "scss", "imports.scss"),
          output: {
            filename: "bundle.source-maps.js"
          },
          devtool: "source-map",
          module: {
            rules: [{
              test: /\.scss$/,
              use: [
                {
                  loader: testLoader.filename
                },
                {
                  loader: "sass-loader"
                },
                {
                  loader: pathToKssLoader,
                  options: {
                    source: path.join(__dirname, 'scss'),
                    destination: path.join(__dirname, 'scss', 'docs')
                  }
                }
              ]
            }]
          }
        }, function (err) {
          return err ? reject(err) : resolve();
        });
      });
    }

    it("should compile without errors", function () {
      return buildWithSourceMaps();
    });
  });
});

function readCss(ext, id) {
  return fs.readFileSync(path.join(__dirname, ext, "docs", "item-" + id + ".html"), "utf8").replace(CR, "");
}

function runWebpack(baseConfig, done) {
  var webpackConfig = merge({
    output: {
      path: path.join(__dirname, "output"),
      filename: "bundle.js",
      libraryTarget: "commonjs2"
    }
  }, baseConfig);

  webpack(webpackConfig, function (webpackErr, stats) {
    var err = webpackErr ||
      (stats.hasErrors() && stats.compilation.errors[0]) ||
      (stats.hasWarnings() && stats.compilation.warnings[0]);

    done(err || null);
  });
}

function readBundle(filename) {
  delete require.cache[path.resolve(__dirname, `./output/${filename}`)];

  return require(`./output/${filename}`);
}
