import { getRequestData } from './functions/getRequestData';
import { RequestData } from './models/RequestData';
import { setReaded as setReadedInDB } from '../infrastructure/setReaded';
import { ControllerParams } from './models/ControllerParams';

const setReaded = ({ req, res, onFinish }: ControllerParams) => {
  const { id, user, feedsId }: RequestData = getRequestData(req);

  if (Number.isNaN(id) && feedsId.length === 0) {
    res.status(500).json({ error: 'invalid id' });
    return;
  }

  if (user === '') {
    res.status(500).json({ error: 'invalid user' });
    return;
  }

  if (id && feedsId.length === 0) feedsId.push('' + id);

  setReadedInDB(
    () => {
      res.status(200).json({ result: 'success' });
      onFinish && onFinish();
    },
    (error: Error) => {
      res.status(500).json({ error: error.message ?? '' });
      onFinish && onFinish();
    },
    { id, user, feedsId }
  );
};

export { setReaded };
