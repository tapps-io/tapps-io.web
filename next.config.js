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
    return config;
  },
});
