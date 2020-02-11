import request from 'request-promise';
import { Router } from 'express';

export function endpoints() {
  const router = Router();

  router.get('/:id', async (req, res, next) => {
    const tapp = await request.get(`${process.env.CMS}/tapps?tapp=${req.params.id}`);
    console.log(tapp);
    next();
  });

  return router;
}
