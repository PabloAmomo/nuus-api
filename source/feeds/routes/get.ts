import express from 'express';
import { getFeeds } from '../controller/getFeeds';
import { getFeed } from '../controller/getFeed';
const router = express.Router();

router.get('/feeds', (req, res, next) => getFeeds({req, res, next}));
router.get('/feeds/:id', (req, res, next) => getFeed({req, res, next}));

export default router;
