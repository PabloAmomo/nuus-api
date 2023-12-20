import { getFeeds } from './getFeeds';
import { FeedFilter } from './models/FeedFilter';

const getFeed = (onResult: CallableFunction, onError: CallableFunction, feedFilter: FeedFilter) => {
  getFeeds(onResult, onError, { ...feedFilter, count: 1, back: 0, filter: [] });
};

export { getFeed };
