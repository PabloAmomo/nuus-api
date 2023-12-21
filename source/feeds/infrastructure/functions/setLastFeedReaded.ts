import { FeedsConfig } from '../../models/FeedsConfig';
import { ReadedOption } from '../models/ReadedOption';
import databaseQuery from '../../../shared/infraestructure/persistence/databaseQuery';

const queryReplaceReaded = `REPLACE INTO feedLast (feedId_fk, publishDate, \`user\`) VALUES {values};`;

const setLastReaded = (config: FeedsConfig, readedOption: ReadedOption, replaceValues: string[]) => {
  /** Set the lastfeed readed */
  databaseQuery(
    config.database,
    queryReplaceReaded.replace('{values}', replaceValues.join(',')),
    [],
    () => {},
    (error: Error) => console.log(`setLastReaded: Error seting readed feed ${readedOption.feedsId.join(',')} for user ${readedOption.user} (${error.message})`)
  );
};

export { setLastReaded };
