import express from 'express';
import { setReaded } from '../controller/setReaded';
const router = express.Router();

router.post('/feeds-readed', (req, res, next) => setReaded({req, res, next}));
router.post('/feeds-readed/:id', (req, res, next) => setReaded({req, res, next}));

export default router;
