import { Error } from '../../../shared/models/Error';
import { FeedsConfig } from '../../models/FeedsConfig';
import { ReadedOption } from '../models/ReadedOption';
import databaseQuery from '../../../shared/infraestructure/persistence/databaseQuery';

const queryInsertReaded = `INSERT INTO feedReaded (feedId_fk, \`user\`) VALUES {values};`;

const setFeedsReaded = (config: FeedsConfig, readedOption: ReadedOption, insertValues: string[], onResult: CallableFunction, onError: CallableFunction) => {
  databaseQuery(
    config.database,
    queryInsertReaded.replace('{values}', insertValues.join(',')),
    [],
    () => onResult(),
    (error: Error) => {
      if (error?.code == 'ER_DUP_ENTRY') onResult();
      else {
        onError(new Error('Error setting feeds readed'));
        console.log(`setFeedsReaded: Error seting readed feed ${readedOption.feedsId.join(',')} for user ${readedOption.user} (${error.message})`);
      }
    }
  );

};

export { setFeedsReaded };
