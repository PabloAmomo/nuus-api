import { FeedFilter } from './models/FeedFilter';
import { FeedResult } from './models/FeedResult';
import { getFeedsBack } from './functions/getFeedsBack';
import { getFeedsForward } from './functions/getFeedsFordward';
import { parseGetFeedsResult } from './functions/parseGetFeedsResult';
import config from '../config/config';
import databaseQuery from '../../shared/infraestructure/persistence/databaseQuery';

const getFeeds = (onResult: CallableFunction, onError: CallableFunction, options: FeedFilter) => {
  /** Get the query and params */
  const { query, params } = options.back ? getFeedsBack(options) : getFeedsForward(options);

  /** Execute the query */
  databaseQuery(config.database, query, params)
    .then((result: FeedResult[] | []) => onResult(parseGetFeedsResult(result)))
    .catch((error) => onError(error));
};

export { getFeeds };

