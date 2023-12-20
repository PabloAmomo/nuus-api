import { getFeeds } from './getFeeds';
import { FeedFilter } from './models/FeedFilter';

const getFeed = async (onResult:CallableFunction, onError: CallableFunction, feedFilter: FeedFilter ) => {
  await getFeeds(onResult, onError, { ...feedFilter, count: 1, back: 0, filter: [] });
}

export { getFeed }