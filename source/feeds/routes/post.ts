import express from 'express';
import { setReaded } from '../controller/setReaded';
const router = express.Router();

router.post('/feeds/readed', setReaded);
router.post('/feeds/readed/:id', setReaded);

export default router;
