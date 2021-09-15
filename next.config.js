/* eslint-disable @typescript-eslint/no-var-requires */
const withTM = require('next-transpile-modules')(['@trutoo']); // pass the modules you would like to see transpiled
const path = require('path');

module.exports = withTM({
  env: {
    CMS: 'http://127.0.0.1:1337',
    GATEWAY: 'http://127.0.0.1:3000',
  },
  webpack(config) {
    config.resolve.modules.unshift(process.cwd());

    /* Remove pure mode from css-loader */
    let cssRule;
    config.module.rules.forEach(group => {
      if (!group.oneOf) return false;
      cssRule = group.oneOf.find(rule => rule.test.toString() == '/\\.module\\.css$/');
    });
    if (cssRule) {
      const cssLoader = cssRule.use.find(use => use.loader.includes('css-loader'));
      if (cssLoader) {
        cssLoader.options.modules.mode = 'local';
      }
    }

    return config;
  },
});
