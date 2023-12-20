import { FeedsFilter } from '../models/FeedsFilter';

interface result {
  query: string;
  params: any[];
}

const getFeedsForward = (feedsFilter: FeedsFilter): result => {
  /**  Construct the where clause */
  const filter = feedsFilter.id
    ? ` WHERE TORDER.id = ${feedsFilter.id} `
    : ` LEFT JOIN feedReaded as TREADED on TREADED.feedId_fk = TORDER.id and TREADED.user = ? WHERE TREADED.id is null `;
  /** Add the filter */
  const sources = (feedsFilter?.filter?.length ?? 0) === 0 ? 'source' : ` (SELECT * FROM source WHERE typeId_fk NOT IN (${feedsFilter.filter.join(',')})) `;
  /** Construct the query  */
  const query = `
    SELECT TFEEDS.id, TFEEDS.publishDate, TFEEDS.title, TFEEDS.summary, TFEEDS.content,
           TFEEDS.authors, TFEEDS.categories, TFEEDS.link, TFEEDS.images, TFEEDS.sourceId,
           TSOURCES.typeId_fk sourceType, IFNULL(TSOURCES.feed_ImageUrl_Fixed, TSOURCES.feed_ImageUrl) sourceIcon, 
           TSOURCES.name sourceName, TSOURCES.feed_TitleText sourceTitle, TSOURCES.feed_DescriptionText sourceDescription
    FROM 
    (SELECT TORDER.id, TORDER.publishDate, TORDER.titleText title, TORDER.summaryText summary, TORDER.contentText content,
      TORDER.authors, TORDER.categories, TORDER.link, TORDER.images, TORDER.sourceId_fk sourceId
      FROM feedItem as TORDER
      ${filter}
      ORDER BY TORDER.publishDate DESC
      LIMIT ${feedsFilter.count ?? 10}) AS TFEEDS
    INNER JOIN ${sources} as TSOURCES ON TSOURCES.id = TFEEDS.sourceId
  `;
  /** Set the parameters */
  const params = [feedsFilter.user];
  /** */
  return { query, params };
};

export { getFeedsForward };
