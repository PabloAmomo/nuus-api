import { Request } from 'express';
import { RequestData } from '../models/RequestData';

const getRequestData = (req: Request): RequestData => {
  const body = req.body || {};
  const id: string = req.params.id;
  const count = req.query.count ? parseInt(req.query.count as string) : 10;
  const user = req.header('x-user') ? (req.header('x-user') as string) : '';
  const filter = req.query.filter ? (req.query.filter as string).split(',') : [];
  const feedsId = (body?.feedsId ? ('' + body.feedsId).split(',').map(item => item.trim()) : null) 
                  || (req.query.feedsId ? (req.query.feedsId as string).split(',') : []);
  const back = req.query.back ? parseInt(req.query.back as string) : 0;
  return { count, user, filter, back, id: Number.isNaN(parseInt(id)) ? NaN : parseInt(id), feedsId };
};

export { getRequestData };
