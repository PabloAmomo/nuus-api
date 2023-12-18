import { FeedOptions } from "../models/FeedOptions";

interface result {
  query: string;
  params: any[];
}

const getFeedsForward = (options: FeedOptions) : result => {
  /**  Construct the where clause */
  const filter = options.id ? ` WHERE T1.id = ${options.id} ` : ` LEFT JOIN feedReaded as T3 on T3.feedId_fk = T1.id and T3.user = ? WHERE T3.id is null `;
  /** Add the filter */
  const sources = (options?.filter?.length ?? 0) === 0 ? 'source' : ` (SELECT * FROM source WHERE typeId_fk NOT IN (${options.filter.join(',')})) `;
  /** Construct the query  */
  const query = `
      SELECT T1.id, T1.publishDate, T1.titleText title, T1.summaryText summary, T1.contentText content, 
        T1.authors, T1.categories, T1.link, T1.images, T1.sourceId_fk sourceId, 
        T2.typeId_fk sourceType, IFNULL(T2.feed_ImageUrl_Fixed, T2.feed_ImageUrl) sourceIcon, T2.name sourceName, 
        T2.feed_TitleText sourceTitle, T2.feed_DescriptionText sourceDescription
    FROM feedItem as T1 
    INNER JOIN ${sources} as T2 ON T2.id = T1.sourceId_fk 
    ${filter}
    ORDER BY T1.publishDate DESC 
    LIMIT ${options.count ?? 10};
  `;
  /** Set the parameters */
  const params = [options.user];
  /** */
  return { query, params };
};

export { getFeedsForward }