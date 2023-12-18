import { FeedOptions } from '../models/FeedOptions';
import { FeedResult } from '../models/FeedsResult';
import { getFeedsBack } from '../functions/getFeedsBack';
import { getFeedsForward } from '../functions/getFeedsFordward';
import { parseGetFeedsResult } from '../functions/parseGetFeedsResult';
import config from '../config/config';
import databaseQuery from '../../commons/infraestructure/database/databaseQuery';

const getFeeds = (onResult: CallableFunction, onError: CallableFunction, options: FeedOptions) => {
  /** Get the query and params */
  const { query, params } = options.back ? getFeedsBack(options) : getFeedsForward(options);

  /** Execute the query */
  databaseQuery(config.database, query, params)
    .then((result: FeedResult[] | []) => onResult(parseGetFeedsResult(result)))
    .catch((error) => onError(error));
};

export { getFeeds };

