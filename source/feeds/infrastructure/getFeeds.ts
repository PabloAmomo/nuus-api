import { FeedsFilter } from './models/FeedsFilter';
import { FeedResult } from './models/FeedResult';
import { getFeedsBack } from './functions/getFeedsBack';
import { getFeedsForward } from './functions/getFeedsFordward';
import { parseGetFeedsResult } from './functions/parseGetFeedsResult';
import config from '../config/config';
import databaseQuery from '../../shared/infraestructure/persistence/databaseQuery';
import { Error } from '../../shared/models/Error';

const getFeeds = (onResult: CallableFunction, onError: CallableFunction, feedsFilter: FeedsFilter) => {
  /** Get the query and params */
  const { query, params } = feedsFilter.back ? getFeedsBack(feedsFilter) : getFeedsForward(feedsFilter);

  /** Execute the query */
  databaseQuery(
    config.database,
    query,
    params,
    (result: FeedResult[] | []) => {
      onResult(parseGetFeedsResult(result));
    },
    (error: Error) => {
      onError(error);
    }
  );
};

export { getFeeds };
