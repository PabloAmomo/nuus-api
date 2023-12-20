import { ReadedOption } from './models/ReadedOption';
import config from '../config/config';
import databaseQuery from '../../shared/infraestructure/persistence/databaseQuery';
import { Error } from '../../shared/models/Error';

const queryInsertAllReaded = `INSERT INTO feedReaded (feedId_fk, \`user\`) VALUES {values};`;

const processError = (readedOption: ReadedOption, error: Error, onError: CallableFunction) => {
  // console.log(`Error seting readed feed ${readedOption.feedsId.join(',')} for user ${readedOption.user} (${error.message})`);
};

const setReaded = (onResult: CallableFunction, onError: CallableFunction, readedOption: ReadedOption) => {
  // Process each readed feed
  const values = [];
  for (let i = 0; i < readedOption.feedsId.length; i++) {
    const id: number = parseInt(readedOption.feedsId[i]);
    if (Number.isNaN(id)) continue;
    values.push(`(${readedOption.feedsId[i]}, '${readedOption.user}')`);
  }
  if (values.length === 0) {
    onResult();
    return;
  }

  /** Set the feed as readed */
  databaseQuery(
    config.database,
    queryInsertAllReaded.replace('{values}', values.join(',')),
    [],
    () => onResult(),
    (error: Error) => {
      if (error.code == 'ER_DUP_ENTRY') onResult();
      else {
        processError(readedOption, error, onError);
        onError(new Error('Error setting readed'));
      }
    }
  );
};

export { setReaded };
