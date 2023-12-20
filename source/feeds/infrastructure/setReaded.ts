import { ReadedOption } from './models/ReadedOption';
import config from '../config/config';
import databaseQuery from '../../shared/infraestructure/persistence/databaseQuery';

const queryIsReaded = `SELECT feedId_fk FROM feedReaded WHERE feedId_fk = ? AND \`user\` = ? LIMIT 1`;
const queryInsertReaded = `INSERT INTO feedReaded (feedId_fk, \`user\`) VALUES (?, ?)`;

const processError = (readedOption: ReadedOption, error: Error, onError: CallableFunction) => {
  // console.log(`Error seting readed feed ${readedOption.id} for user ${readedOption.user} (${error.message})`);
};

const setReaded = async (onResult: CallableFunction, onError: CallableFunction, readedOption: ReadedOption) => {
  /**  Set the feeds as readed */
  var anyFail = false;
  // Process each readed feed
  for (let i = 0; i < readedOption.feedsId.length; i++) {
    const id: number = parseInt(readedOption.feedsId[i]);
    if (Number.isNaN(id)) continue;
    /** Check if the feed is already readed */
    await databaseQuery(config.database, queryIsReaded, [id, readedOption.user])
      .then(async (result) => {
        // Feed already readed
        if (result.length !== 0) return;
        
        /** Set the feed as readed */
        await databaseQuery(config.database, queryInsertReaded, [id, readedOption.user])
          // .then(() => onResult())
          .catch((error) => { anyFail = true; processError({ ...readedOption, id }, error, onError) });
      })
      .catch((error) => { anyFail = true; processError({ ...readedOption, id }, error, onError)} );
  }
  // Return the result
  if (anyFail) onError(new Error('Error setting readed')); 
  else onResult();
};

export { setReaded };
