import { getFeeds } from './getFeeds';

interface Options { 
  id: number;
  user: string;
};

const getFeed = (onResult:CallableFunction, onError: CallableFunction, options: Options ) => {
  getFeeds(onResult, onError, { ...options, count: 1, back: 0, filter: [] });
}

export { getFeed }