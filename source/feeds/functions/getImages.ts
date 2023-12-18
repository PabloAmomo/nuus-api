import { FeedImage } from "../models/FeedImage";

const getImages = (images: string) : FeedImage[] => {
  const result: FeedImage[] = [];
  if (images) {
    images.split('|').forEach((item: string) => {
      const parts = item.split(',');
      result.push({
        width: parseInt(parts[0]),
        height: parseInt(parts[1]),
        url: parts[2],
      });
    });
  }
  return result;
};

export default getImages;