/* eslint-disable @typescript-eslint/no-var-requires */

import path from 'path';
import { Express, Router } from 'express';
import { Compiler } from 'webpack';
import { Transformations } from './utils/transformations';

module.exports = {
  devMode: (app: Express) => {
    console.log('Server started in development mode.');

    const [_, client] = require(path.resolve('webpack.config.js'));

    /* Setup Compiler */
    const compiler: Compiler = require('webpack')(client({ devServer: true }));

    const devMiddleware = require('webpack-dev-middleware')(compiler, {
      publicPath: '/',
      logLevel: 'warn',
      hot: true,
      inline: true,
      stats: {
        colors: true,
      },
      historyApiFallback: true,
    });

    const hotMiddleware = require('webpack-hot-middleware')(compiler, {
      log: console.log,
      noInfo: true,
      path: '/__webpack_hmr',
      heartbeat: 10 * 1000,
    });

    /* Webpack Compilation */
    app.use(devMiddleware);

    /* Webpack Hot Module reload */
    app.use(hotMiddleware);

    /* Require and setup server watcher */
    const chokidar = require('chokidar');
    const watcher = chokidar.watch(['./server/*/**/*']);
    watcher.on('ready', () => {
      watcher.on('all', (event: string, file: string) => {
        console.log(`File [${file}] triggered [${event}], clearing file's require cache`);
        delete require.cache[path.resolve(process.cwd(), file)];
        // Invalidate build to trigger type checking with a slight delay
        setTimeout(() => {
          devMiddleware.invalidate();
        }, 200);
      });
    });

    return compiler;
  },

  devRoutes: (compiler: Compiler, router: Router, transformations: Transformations) => {
    /* Webpack Path to index.html */
    router.get('*', (req, res, next) => {
      const filename = path.join(compiler.outputPath, 'index.html');
      compiler.outputFileSystem.readFile(filename, 'utf8', (err, result) => {
        if (err) return next(err);
        transformations.run(result);
        res.set('content-type', 'text/html');
        res.send(result);
      });
    });
  },
};
