import { Feed } from '../models/Feed';
import { getFeed as getFeedFromDB } from '../infrastructure/getFeed';
import { getRequestData } from './functions/getRequestData';
import { Request, Response, NextFunction } from 'express';
import { RequestData } from './models/RequestData';
import { FeedResponse } from './models/FeedResponse';

const getFeed = (req: Request, res: Response) => {
  const { id, user }: RequestData = getRequestData(req);

  if (Number.isNaN(id)) {
    res.status(500).json({ error: 'invalid id' });
    return;
  }

  if (user === '') {
    res.status(500).json({ error: 'invalid user' });
    return;
  }

  getFeedFromDB(
    (result: FeedResponse) => res.status(200).json({ ...(result ?? {}) }),
    (error: Error) => res.status(500).json({ error: error.message ?? '' }),
    { id, user }
  );
};

export { getFeed };
