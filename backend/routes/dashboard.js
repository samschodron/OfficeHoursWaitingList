import express from 'express'
import { getAllOpenWaitingLists } from '../controllers/dashboard.js';

const router = express.Router();

router.get('/get-all-open-waiting-lists', getAllOpenWaitingLists)

export default router;
