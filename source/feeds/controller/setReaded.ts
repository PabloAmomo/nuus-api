import { getRequestData } from '../functions/getRequestData';
import { Request, Response } from 'express';
import { RequestData } from '../models/RequestData';
import { setReaded as setReadedInDB } from '../infrastructure/setReaded';

const setReaded = async (req: Request, res: Response) => {
  const { id, user, feedsId } : RequestData = getRequestData(req);

  if (Number.isNaN(id) && feedsId.length === 0) {
    res.status(500).json({ error: 'invalid id' });
    return;
  }

  if (user === '') {
    res.status(500).json({ error: 'invalid user' });
    return;
  }

  setReadedInDB(
    () => {
      res.status(200).json({ result: 'success' });
    },
    (error: Error) => {
      res.status(500).json({ error: error.message ?? '' });
    },  
    { id, user, feedsId }
  );
};

export { setReaded };
