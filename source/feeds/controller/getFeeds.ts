import { FeedsResponse } from './models/FeedsResponse';
import { getFeeds as getFeedsFromDB } from '../infrastructure/getFeeds';
import { getRequestData } from './functions/getRequestData';
import { Request, Response, NextFunction } from 'express';
import { RequestData } from './models/RequestData';

const getFeeds = async (req: Request, res: Response) => {
  const { count, user, filter, back }: RequestData = getRequestData(req);

  if (count > 50) {
    res.status(500).json({ error: 'invalid count' });
    return;
  }

  if (user === '') {
    res.status(500).json({ error: 'invalid user' });
    return;
  }

  await getFeedsFromDB(
    (result: FeedsResponse) => res.status(200).json({ ...(result ?? {}) }),
    (error: Error) => res.status(500).json({ error: error.message ?? '' }),
    { count, user, filter, back }
  );
};

export { getFeeds };
