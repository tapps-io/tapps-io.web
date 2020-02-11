#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
import { config } from 'dotenv';
import path from 'path';
import express, { Express, Router } from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import { Compiler } from 'webpack';

import { Transformations } from './utils/transformations';

config();
const app = express();
const transformations = new Transformations();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compression());

let router: Router;
let compiler: Compiler;
let dev:
  | {
      devMode: (app: Express) => Compiler;
      devRoutes: (compiler: Compiler, router: Router, transformations: Transformations) => void;
    }
  | undefined;

if (process.env.NODE_ENV === 'development') {
  dev = require('./dev.ts');
}

//------------------------------------------------------------------------------------
// BUILD AND HOT RELOAD FOR DEVELOPMENT
//------------------------------------------------------------------------------------

if (process.env.NODE_ENV === 'development') {
  if (dev) compiler = dev.devMode(app);
}

//------------------------------------------------------------------------------------
// ENDPOINTS
//------------------------------------------------------------------------------------

// Add API routes
router = require('./endpoints/index.ts').endpoints();
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    router = require('./endpoints/index.ts').endpoints();
    if (dev) dev.devRoutes(compiler, router, transformations);
  } else {
    router.get('*', (req, res) => {
      return res.status(200).sendFile(path.join(__dirname, 'public/index.html'));
    });
  }
  router(req, res, next);
});

//------------------------------------------------------------------------------------
// SERVER
//------------------------------------------------------------------------------------

/* Init Server */
app.listen(3003, () => {
  console.log(`Website is hosted at http://localhost:${3003}`);
});
