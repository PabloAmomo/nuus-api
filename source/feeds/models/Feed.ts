import { FeedImage } from './FeedImage';

export interface Feed {
  id: Number;
  sourceId: Number;
  publish: string;
  title: String;
  summary: String;
  content: String;
  authors: String[];
  link: String;
  categories: String[];
  images: FeedImage[];
}
