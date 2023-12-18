import { Options } from '../models/ReadOptions';
import config from '../config/config';
import databaseQuery from '../../commons/infraestructure/database/databaseQuery';

const queryIsReaded =  `SELECT feedId_fk FROM feedReaded WHERE feedId_fk = ? AND \`user\` = ? LIMIT 1`;
const queryInsertReaded = `INSERT INTO feedReaded (feedId_fk, \`user\`) VALUES (?, ?)`;

const processError = (options: Options, error: Error, onError: CallableFunction) => {
  /** TODO: Anything to do with the error? */
  console.log(`Error seting readed feed ${options.id} for user ${options.user} (${error.message})`);
};

const setReaded = (onResult: CallableFunction, onError: CallableFunction, options: Options) => {
  /**  Set the feeds as readed */
  for (let i = 0; i < options.feedsId.length; i++) {
    const id: number = parseInt(options.feedsId[i]);
    if (Number.isNaN(id)) continue;
    /** Check if the feed is already readed */
    databaseQuery(config.database, queryIsReaded, [id, options.user])
      .then((result) => {
        if (result.length !== 0) {
          processError({ ...options, id }, new Error('Feed already readed'), onError);
          return;
        }
        /** Set the feed as readed */
        databaseQuery(config.database, queryInsertReaded, [id, options.user]).catch((error) =>
          processError({ ...options, id }, error, onError)
        );
      })
      .catch((error) => processError({ ...options, id }, error, onError));
  }
  /** Run Ok */
  onResult();
};

export { setReaded };
