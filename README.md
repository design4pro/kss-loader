# kss-loader

[![travis build](https://img.shields.io/travis/design4pro/kss-loader.svg)](https://travis-ci.org/design4pro/kss-loader) [![CircleCI](https://circleci.com/gh/design4pro/kss-loader.svg?&style=shield&circle-token=4b7e0017a6fa6840e65f52e413245bbc5cfa894b)](https://circleci.com/gh/design4pro/kss-loader) [![codecov coverage](https://img.shields.io/codecov/c/gh/design4pro/kss-loader.svg)](https://codecov.io/gh/design4pro/kss-loader) [![npm](https://img.shields.io/npm/v/kss-loader.svg)](https://www.npmjs.com/package/kss-loader) [![npm](https://img.shields.io/npm/dt/kss-loader.svg)](https://www.npmjs.com/package/kss-loader) [![Greenkeeper badge](https://badges.greenkeeper.io/design4pro/kss-loader.svg)](https://greenkeeper.io/)

> Webpack loader for [kss-node](https://github.com/kss-node/kss-node)

## Installation

Install the plugin with npm:

```shell
npm install kss-loader --save-dev
```

## Usage

Within your webpack configuration, you'll need to add the kss-loader to the list of modules.

```javascript
module.exports = {
  // ...
  module: {
    rules: [{
      test: /\.scss$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'kss-loader',
        options: {
          title: 'KSS Example',
          mask: '*.scss|*.css',
          placeholder: '[modifier class]',
          source: './scss/',
          destination: './docs/',
          homepage: './../README.md'
        }
      }
    }]
  }
  // ...
}
```

## Options

| Name | Default | Type | Description |
| --- | --- | --- | --- |
| `source` |  | `string` | Source directory to recursively parse for KSS comments,homepage, and markup (relative to webpack.config.js file) |
| `destination` | "styleguide" | `string` | Destination directory of style guide (relative to webpack.config.js file) |
| `mask` | "&#42;.css&#124;&#42;.less&#124;&#42;.sass&#124;&#42;.scss&#124;&#42;.styl&#124;&#42;.stylus" | `string` | Use a mask for detecting files containing KSS comments |
| `config` |  | `string` | Load the kss options from a json file|
| `builder` | "builder/handlebars" | `string` | Use the specified builder when building your style guide |
| `css` |  | `array` | URL of a CSS file to include in the style guide (relative to the generated style guide) |
| `js` |  | `array` | URL of a JavaScript file to include in the style guide (relative to the generated style guide) |
| `custom` |  | `string` | Process a custom property name when parsing KSS comments |
| `extend` |  | `string` | Location of modules to extend the templating system; see [http://bit.ly/kss-wiki]() |
| `homepage` | "homepage.md" | `string` | File name of the homepage's Markdown file (relative to source) |
| `markup` | false | `boolean` | Render "markup" templates to HTML with the placeholder text |
| `placeholder` | "[modifier class]" | `string` | Placeholder text to use for modifier classes |
| `nav-depth` | 3 | `number` | Limit the navigation to the depth specified |
| `title` | "KSS Style Guide" | `string` | Title of the style guide |



For more options, see [kss-node cli options](https://github.com/kss-node/kss-node#using-the-command-line-tool).

## Example

Check out the [example](https://github.com/design4pro/kss-loader/blob/master/example/kss/) directory for a simple KSS style guide example.
