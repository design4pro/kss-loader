'use strict';

module.exports = {
  additionalProperties: false,
  type: 'object',
  properties: {
    config: {
      type: 'string',
      description: 'Load the kss options from a json file',
    },
    source: {
      type: 'string',
      description: 'Source directory to recursively parse for KSS comments, homepage, and markup',
    },
    destination: {
      type: 'string',
      default: 'styleguide',
      description: 'Destination directory of style guide',
    },
    mask: {
      type: 'string',
      default: '*.css|*.less|*.sass|*.scss|*.styl|*.stylus',
      description: 'Use a mask for detecting files containing KSS comments',
    },
    builder: {
      type: 'string',
      description: 'Use the specified builder when building your style guide',
    },
    custom: {
      type: 'array',
      items: {
        type: 'string',
      },
      description: 'Process a custom property name when parsing KSS comments',
    },
    css: {
      type: 'array',
      items: {
        type: 'string',
      },
      description: 'URL of a CSS file to include in the style guide',
    },
    js: {
      type: 'array',
      items: {
        type: 'string',
      },
      description: 'URL of a JavaScript file to include in the style guide',
    },
    extend: {
      type: 'string',
      description: 'Location of modules to extend the templating system; see http://bit.ly/kss-wiki',
    },
    homepage: {
      type: 'string',
      default: 'homepage.md',
      description: 'File name of the homepage\'s Markdown file',
    },
    markup: {
      type: 'boolean',
      description: 'Render \'markup\' templates to HTML with the placeholder text',
    },
    placeholder: {
      type: 'string',
      default: '[modifier class]',
      description: 'Placeholder text to use for modifier classes',
    },
    'nav-depth': {
      type: 'number',
      default: 3,
      description: 'Limit the navigation to the depth specified',
    },
    title: {
      type: 'string',
      default: 'KSS Style Guide',
      description: 'Title of the style guide',
    },
  },
};
