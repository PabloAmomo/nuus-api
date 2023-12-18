import { Feed } from "../models/Feed";
import { FeedsResponse } from "../models/FeedsResponse";
import { FeedResult } from "../models/FeedsResult";
import getImages from "./getImages";

const parseGetFeedsResult = (result: FeedResult[]) : FeedsResponse => {
  const now = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  const response: FeedsResponse = { date: now, feeds: [], sources: [], status: 'success' };
  const sources: any = {};
  response.feeds = result.map((item: FeedResult): Feed => {
    /** Add new source to send */
    if (!sources[item.sourceId]) {
      const { sourceId: id, sourceType: type, sourceIcon: icon, sourceName: name, sourceTitle: title, sourceDescription: description } = item;
      sources[item.sourceId] = { id, type, name, icon, title, description };
    }
    /** Parsed Feed */
    const { id, sourceId, title, content, summary, link, categories, authors, publishDate: publish, images } = item;
    return {
      id,
      sourceId,
      title,
      content,
      summary,
      link,
      categories: categories.split(','),
      authors: authors.split(','),
      publish: publish.toISOString().replace(/\..+/, ''),
      images: getImages(images),
    };
  });
  response.sources = Object.values(sources);
  return response;
};

export { parseGetFeedsResult };