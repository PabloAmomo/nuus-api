import { Feed } from "../../models/Feed";
import { Source } from "../../models/Source";

export interface FeedResponse {
  date: string;
  feeds: Feed[] | [];
  sources: Source[] | [];
  status: string;
}