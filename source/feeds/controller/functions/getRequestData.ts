import { Request } from 'express';
import { RequestData } from '../models/RequestData';
import { scapeValue } from './scapeValue';
import { getIntegerOrDefault } from './getIntegerOrDefault';
import { filterNumberStrings } from './filterNumberStrings';



const getRequestData = (req: Request): RequestData => {
  const body = req.body || {};
  const id = getIntegerOrDefault((req.params.id ?? '') as string, NaN);
  const count = getIntegerOrDefault((req.query.count ?? '') as string, 10);
  const user = scapeValue(req.header('x-user') ?? '');
  const back = getIntegerOrDefault(req.query.back as string, 0);
  const filter = filterNumberStrings(req.query.filter ? (req.query.filter as string).split(',') : []);
  const feedsId = filterNumberStrings((body?.feedsId ? ('' + body.feedsId).split(',').map(item => item.trim()) : null) 
                  || (req.query.feedsId ? (req.query.feedsId as string).split(',') : []));
  return { count, user, filter, back, id, feedsId };
};

export { getRequestData };
