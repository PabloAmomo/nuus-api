import { FeedsFilter } from "../models/FeedsFilter";

interface result {
  query: string;
  params: any[];
}

const getFeedsBack = (feedsFilter: FeedsFilter) : result => {
  /** Add the source filter */
  const filterSources = (feedsFilter?.filter?.length ?? 0) === 0
    ? 'source'
    : ` (SELECT * FROM source WHERE typeId_fk NOT IN (${feedsFilter.filter.join(',')})) `;
  /** Construct the query  */
  const query = `
    SELECT T1.id, T1.publishDate, T1.titleText title, T1.summaryText summary, T1.contentText content, 
      T1.authors, T1.categories, T1.link, T1.images, T1.sourceId_fk sourceId, 
      T2.typeId_fk sourceType, IFNULL(T2.feed_ImageUrl_Fixed, T2.feed_ImageUrl) sourceIcon, T2.name sourceName, 
      T2.feed_TitleText sourceTitle, T2.feed_DescriptionText sourceDescription
    FROM feedItem as T1 
    INNER JOIN ${filterSources} as T2 ON T2.id = T1.sourceId_fk 
    -- join with the latest x readed feeds
    INNER JOIN (SELECT feedId_fk 
                FROM feedReaded 
                  WHERE id < IFNULL((SELECT id 
                              FROM feedReaded 
                              WHERE user = '${feedsFilter.user}' and feedId_fk = ${feedsFilter.back}), 999999999999)
                        and user = '${feedsFilter.user}'
                ORDER BY feedReaded.id DESC
                LIMIT ${feedsFilter.count}) as T3 ON T3.feedId_fk = T1.id
    ORDER BY T1.publishDate DESC;
  `;
  /** Set the parameters */
  const params: string[] = [];
  /** */
  // console.log(query);
  return { query, params };
};

export { getFeedsBack }