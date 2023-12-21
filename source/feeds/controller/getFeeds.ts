import { FeedsResponse } from './models/FeedsResponse';
import { getFeeds as getFeedsFromDB } from '../infrastructure/getFeeds';
import { getRequestData } from './functions/getRequestData';
import { RequestData } from './models/RequestData';
import { ControllerParams } from './models/ControllerParams';

const getFeeds = ({ req, res, onFinish }: ControllerParams) => {
  const { count, user, filter, back }: RequestData = getRequestData(req);

  if (count > 50) {
    res.status(500).json({ error: 'invalid count' });
    return;
  }

  if (user === '') {
    res.status(500).json({ error: 'invalid user' });
    return;
  }

  getFeedsFromDB(
    (result: FeedsResponse) => {
      res.status(200).json({ ...(result ?? {}) });
      onFinish && onFinish();
    },
    (error: Error) => {
      res.status(500).json({ error: error.message ?? '' });
      onFinish && onFinish();
    },
    { count, user, filter, back }
  );
};

export { getFeeds };
