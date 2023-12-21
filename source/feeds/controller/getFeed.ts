import { getFeed as getFeedFromDB } from '../infrastructure/getFeed';
import { getRequestData } from './functions/getRequestData';
import { RequestData } from './models/RequestData';
import { FeedResponse } from './models/FeedResponse';
import { ControllerParams } from './models/ControllerParams';

const getFeed = ({ req, res, onFinish }: ControllerParams) => {
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
    (result: FeedResponse) => {
      res.status(200).json({ ...(result ?? {}) });
      onFinish && onFinish();
    },
    (error: Error) => {
      res.status(500).json({ error: error.message ?? '' });
      onFinish && onFinish();
    },
    { id, user }
  );
};

export { getFeed };
