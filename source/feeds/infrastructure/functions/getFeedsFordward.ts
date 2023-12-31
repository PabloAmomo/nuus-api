import { FeedsFilter } from '../models/FeedsFilter';

interface result {
  query: string;
  params: any[];
}

const getFeedsForward = (feedsFilter: FeedsFilter): result => {
  /**  Construct the where clause */
  const filter = feedsFilter.id
    ? ` WHERE TORDER.id = ${feedsFilter.id} `
    : ` LEFT JOIN feedReaded as TREADED on TREADED.feedId_fk = TORDER.id and TREADED.user = '${feedsFilter.user}' 
        WHERE TREADED.id is null `;
  /** TODO: Optimize the query */
  // const filter = feedsFilter.id
  //   ? ` WHERE TORDER.id = ${feedsFilter.id} `
  //   : ` 
  //       WHERE TORDER.id > IFNULL((SELECT feedLast.feedId_fk FROM feedLast WHERE \`user\` = '${feedsFilter.user}'), 0)
	// 				OR 
	// 				(
	// 					TORDER.id < (SELECT feedLast.feedId_fk FROM feedLast WHERE \`user\` = '${feedsFilter.user}') 
	// 					AND 
	// 					TORDER.publishDate < (SELECT feedLast.publishDate FROM feedLast WHERE \`user\` = '${feedsFilter.user}')
	// 				)
  //   `;
  /** Add the filter */
  const filterSources =
    (feedsFilter?.filter?.length ?? 0) === 0
      ? ''
      : ` AND TORDER.sourceId_fk NOT IN (SELECT id FROM source WHERE typeId_fk IN (${feedsFilter.filter.join(',')})) `;
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
        ${filterSources}
        ORDER BY TORDER.publishDate DESC
        LIMIT ${feedsFilter.count}) AS TFEEDS
    INNER JOIN source as TSOURCES ON TSOURCES.id = TFEEDS.sourceId
    ORDER BY publishDate DESC;
  `;
  /** Set the parameters */
  const params: string[] = [];
  /** */
  // console.log(query);
  return { query, params };
};

export { getFeedsForward };
