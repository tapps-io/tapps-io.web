/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';
const path = require('path');
const merge = require('webpack-merge');
const { HotModuleReplacementPlugin, ProvidePlugin } = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const serverCWD = path.join(process.cwd(), 'server');
const clientCWD = path.join(process.cwd(), 'client');
const compileModules = ['@trutoo'];

const base = (_, argv) => ({
  mode: argv.mode || 'development',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    modules: ['node_modules'],
  },
  module: {
    rules: [
      {
        // Source files and non-compiled node_modules
        test: /\.(js|ts)x?$/,
        exclude: new RegExp(`node_modules\\${path.sep}(?!${compileModules.join('|')})`),
        use: ['babel-loader'],
      },
      {
        // Only source files
        test: /\.(js|ts)x?$/,
        include: [serverCWD, clientCWD],
        use: [{ loader: 'prettier-loader', options: { parser: 'typescript' } }],
      },
    ],
  },

  plugins: [
    new ForkTsCheckerWebpackPlugin({
      tsconfig: path.resolve('tsconfig.json'),
      eslint: true,
      checkSyntacticErrors: true,
    }),
  ].concat(
    argv.mode !== 'production'
      ? [
          new ProvidePlugin({
            Promise: ['core-js/es/promise'], // Polyfill promises for react-hot-reload on dev servers
          }),
        ]
      : [],
  ),

  performance: {
    maxEntrypointSize: 512000,
  },

  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: {},
          output: {
            ascii_only: true, // eslint-disable-line @typescript-eslint/camelcase
            webkit: true,
          },
          compress: {
            typeofs: false,
            inline: 3,
            pure_getters: true, // eslint-disable-line @typescript-eslint/camelcase
            passes: 3,
          },
        },
      }),
    ],
  },

  devtool: argv.mode !== 'production' ? 'cheap-module-eval-source-map' : false,
});

//------------------------------------------------------------------------------------
// SERVER SPECIFIC CONFIGURATION
//------------------------------------------------------------------------------------

const server = (_, argv) =>
  merge(base(_, argv), {
    name: 'server',
    context: serverCWD,
    entry: ['./main.ts'],
    target: 'node',
    externals: [/webpack\.config$/, nodeExternals()],
    output: {
      filename: 'server.js',
      libraryTarget: 'commonjs2',
    },
    resolve: {
      modules: [serverCWD],
    },
  });

//------------------------------------------------------------------------------------
// CLIENT SPECIFIC CONFIGURATION
//------------------------------------------------------------------------------------

const client = (_, argv) =>
  merge(base(_, argv), {
    name: 'client',
    context: clientCWD,
    entry: ['./main.tsx'],
    output: {
      filename: 'client.js',
    },
    resolve: {
      modules: [clientCWD],
    },

    module: {
      rules: [
        {
          // All CSS files
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: argv.mode !== 'production',
              },
            },
          ],
        },
        {
          // All CSS module files
          test: /\.css$/,
          include: /\.module\.css$/,
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: argv.mode === 'production' ? '[hash:base64]' : '[local]_[hash:base64:7]',
                },
              },
            },
            { loader: 'postcss-loader' },
          ],
        },
        {
          // All CSS non-module files
          test: /\.css$/,
          exclude: /\.module\.css$/,
          use: ['css-loader', { loader: 'postcss-loader' }],
        },
        {
          // All CSS source files
          test: /\.css$/,
          include: [clientCWD],
          use: [{ loader: 'prettier-loader', options: { parser: 'css' } }],
        },
        {
          // All other assets
          test: /\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
              },
            },
          ],
        },
      ],
    },

    plugins: [
      new HotModuleReplacementPlugin(),
      new StyleLintPlugin({
        files: '**/*.css',
      }),
      new MiniCssExtractPlugin(),
    ],

    optimization: {
      minimizer: [
        new OptimizeCSSAssetsPlugin({
          cssProcessorPluginOptions: {
            preset: [
              'default',
              {
                calc: false,
              },
            ],
          },
        }),
      ],
    },
  });

//------------------------------------------------------------------------------------
// EXPORTS
//------------------------------------------------------------------------------------

module.exports = [server, client];
