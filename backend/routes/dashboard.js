import express from 'express'
import { getAllOpenWaitingLists, getAllJoinedWaitingRooms } from '../controllers/dashboard.js';

const router = express.Router();

router.get('/get-all-open-waiting-lists', getAllOpenWaitingLists)

router.get('/getAllJoinedWaitingRooms', getAllJoinedWaitingRooms)

export default router;
