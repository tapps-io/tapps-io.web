/* eslint-disable @typescript-eslint/no-var-requires */

import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compression());

//------------------------------------------------------------------------------------
// HOT RELOAD FOR DEVELOPMENT
//------------------------------------------------------------------------------------

if (process.env.NODE_ENV !== 'production') {
  /* Load Config and Setup Compilers */
  const webpack = require('webpack');
  let [server, client] = require(path.resolve('webpack.config'));
  server = server(undefined, {});
  client = client(undefined, {});
  client.entry.push('webpack-hot-middleware/client');
  const serverCompiler = webpack(server);
  const clientCompiler = webpack(client);

  /* Joint compiler settings */
  const watchOptions = {
    aggregateTimeout: 300,
    poll: true,
  };

  /* Watch for server changes */
  serverCompiler.watch(watchOptions, (err: any, stats: any) => {
    if (err) {
      throw err;
    }
    const statsJSON = stats.toJson();
    console.log(`Server bundle built ${statsJSON.hash} in ${statsJSON.time} ms`);
  });

  /* Watch for client changes */
  clientCompiler.watch(watchOptions, (err: any, stats: any) => {
    if (err) {
      throw err;
    }
    const statsJSON = stats.toJson();
    console.log(`Client bundle built ${statsJSON.hash} in ${statsJSON.time} ms`);
  });

  /* Attach hot reload to client compiler */
  app.use(
    require('webpack-hot-middleware')(clientCompiler, {
      log: false,
      path: '/__webpack_hmr',
      heartbeat: 10 * 1000,
    }),
  );
}

//------------------------------------------------------------------------------------
// SERVER
//------------------------------------------------------------------------------------

/* Init Server */
app.listen(3003, () => {
  console.log(`Website is hosted at http://localhost:${3003}`);
});
