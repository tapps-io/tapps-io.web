import { Router } from 'express';

/* Endpoint Controllers */
export function endpoints() {
  const router = Router();

  //router.use('/api/login', require('./login.js').endpoints());

  router.get('/api/*', (req, res) => {
    res.status(501).send({ error: 'No such api' });
  });

  router.use('/tapps', require('./tapps.ts').endpoints());

  return router;
}
