import { ReadedOption } from './models/ReadedOption';
import config from '../config/config';
import { setLastReaded } from './functions/setLastFeedReaded';
import { setFeedsReaded } from './functions/setFeedsReaded';

const setReaded = (onResult: CallableFunction, onError: CallableFunction, readedOption: ReadedOption) => {
  /** Process each readed feed and create values to send */
  const insertValues: string[] = [];
  const replaceValues: string[] = [];
  for (let i = 0; i < readedOption.feedsId.length; i++) {
    const id: number = parseInt(readedOption.feedsId[i]);
    if (Number.isNaN(id)) continue;
    insertValues.push(`(${readedOption.feedsId[i]}, '${readedOption.user}')`);
    replaceValues.push(`('${id}', IFNULL((SELECT publishDate FROM feedItem WHERE id = '${id}'), NOW()), '${readedOption.user}')`);
  }
  if (insertValues.length === 0) {
    onResult();
    return;
  }

  /** Set the lastfeed readed */
  setLastReaded(config, readedOption, replaceValues);

  /** Set the feed as readed */
  setFeedsReaded(config, readedOption, insertValues, onResult, onError);
};

export { setReaded };
