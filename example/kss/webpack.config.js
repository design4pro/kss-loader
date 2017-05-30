const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const OUT_PATH = path.resolve('./css');
const KSS_LOADER_CONFIG = {
  title: 'KSS Example',
  mask: '*.scss|*.css',
  placeholder: '[modifier class]',
  // relative to this file'
  source: './scss/',
  destination: './docs/',
  // relative to source'
  homepage: './../README.md'
};

const extractSass = new ExtractTextPlugin({
  filename: '[name].css',
  disable: process.env.NODE_ENV === 'development'
});

module.exports = {
  entry: require.resolve('./scss/main.scss'),
  output: {
    path: OUT_PATH,
    filename: '[name].css'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /(node_modules|bower_components)/,
        use: extractSass.extract({
          use: [
            {
              loader: 'css-loader'
            }, {
              loader: 'sass-loader'
            }
          ],
          // use style-loader in development
          fallback: 'style-loader'
        }),
      },
      {
        test: /\.scss$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'kss-loader',
          options: KSS_LOADER_CONFIG
        }
      }
    ]
  },
  plugins: [
    extractSass
  ]
};
