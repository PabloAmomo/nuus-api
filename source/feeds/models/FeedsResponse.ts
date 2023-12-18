import { Feed } from "./Feed";
import { Source } from "./Source";

export interface FeedsResponse {
  date: string;
  feeds: Feed[] | [];
  sources: Source[] | [];
  status: string;
}