import { FeedsFilter } from './models/FeedsFilter';
import { FeedResult } from './models/FeedResult';
import { getFeedsBack } from './functions/getFeedsBack';
import { getFeedsForward } from './functions/getFeedsFordward';
import { parseGetFeedsResult } from './functions/parseGetFeedsResult';
import config from '../config/config';
import databaseQuery from '../../shared/infraestructure/persistence/databaseQuery';

const getFeeds = async (onResult: CallableFunction, onError: CallableFunction, feedsFilter: FeedsFilter) => {
  /** Get the query and params */
  const { query, params } = feedsFilter.back ? getFeedsBack(feedsFilter) : getFeedsForward(feedsFilter);

  /** Execute the query */
  await databaseQuery(config.database, query, params)
    .then((result: FeedResult[] | []) => onResult(parseGetFeedsResult(result)))
    .catch((error) => onError(error));
};

export { getFeeds };

