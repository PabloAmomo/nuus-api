
import RoutesGet from './get';
import RoutesPost from './post';
import { Express } from 'express';
import { configDotenv } from 'dotenv';
configDotenv();

const ROOT_PATH = process.env.ROOT_PATH ?? '';

const setRouterFeeds = (router: Express) => {
  router.use(`${ROOT_PATH}/`, RoutesGet);
  router.use(`${ROOT_PATH}/`, RoutesPost);
}

export default setRouterFeeds;