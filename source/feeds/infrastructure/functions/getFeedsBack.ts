import { FeedsFilter } from "../models/FeedsFilter";
import { scapeValue } from "./scapeValue";

interface result {
  query: string;
  params: any[];
}

const getFeedsBack = (feedsFilter: FeedsFilter) : result => {
  // TODO: scape the back and count value
  /** Get the user */
  const user = scapeValue(feedsFilter.user);
  /** Get the last id readed */
  const back = feedsFilter.back ?? 0;
  /** Construct the query  */
  const query = `
    SELECT T1.id, T1.publishDate, T1.titleText title, T1.summaryText summary, T1.contentText content, 
      T1.authors, T1.categories, T1.link, T1.images, T1.sourceId_fk sourceId, 
      T2.typeId_fk sourceType, IFNULL(T2.feed_ImageUrl_Fixed, T2.feed_ImageUrl) sourceIcon, T2.name sourceName, 
      T2.feed_TitleText sourceTitle, T2.feed_DescriptionText sourceDescription
    FROM feedItem as T1 
    INNER JOIN source as T2 ON T2.id = T1.sourceId_fk 
    -- join with the latest x readed feeds
    INNER JOIN (SELECT feedId_fk 
                FROM feedReaded 
                  WHERE id < (SELECT id 
                              FROM feedReaded 
                              WHERE user = '${user}' and feedId_fk = ${back}) and user = '${user}'
                ORDER BY feedReaded.id DESC
                LIMIT ${feedsFilter.count ?? 10}) as T3 ON T3.feedId_fk = T1.id
    ORDER BY T1.publishDate DESC;
  `;
  /** Set the parameters */
  const params: string[] = [];
  /** */
  return { query, params };
};

export { getFeedsBack }