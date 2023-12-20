import { Feed } from '../models/Feed';
import { getFeed as getFeedFromDB } from '../infrastructure/getFeed';
import { getRequestData } from './functions/getRequestData';
import { Request, Response, NextFunction } from 'express';
import { RequestData } from './models/RequestData';

const getFeed = async (req: Request, res: Response, next: NextFunction) => {
  const { id, user }: RequestData = getRequestData(req);

  if (Number.isNaN(id)) {
    res.status(500).json({ error: 'invalid id' });
    return;
  }

  if (user === '') {
    res.status(500).json({ error: 'invalid user' });
    return;
  }

  await getFeedFromDB(
    (result: Feed) => res.status(200).json({ ...(result ?? {}) }),
    (error: Error) => res.status(500).json({ error: error.message ?? '' }),
    { id, user }
  );
};

export { getFeed };
