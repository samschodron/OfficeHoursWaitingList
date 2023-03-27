import express from 'express'
import { createWaitingRoom } from '../controllers/studentJoin.js';

const router = express.Router();

/*
    path from root: /waitingRoom/createWaitingRoom
*/
router.post('/joinWaitingRoom', createWaitingRoom)

export default router;