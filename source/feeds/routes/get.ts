import express from 'express';
import { getFeeds } from '../controller/getFeeds';
import { getFeed } from '../controller/getFeed';
const router = express.Router();

router.get('/feeds', getFeeds);
router.get('/feeds/:id', getFeed);

export default router;
