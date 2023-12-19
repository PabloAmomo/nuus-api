import { Feed } from "../../models/Feed";
import { Source } from "../../models/Source";

export interface FeedsResponse {
  date: string;
  feeds: Feed[] | [];
  sources: Source[] | [];
  status: string;
}