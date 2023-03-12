import express from 'express'
import { createWaitingRoom } from '../controllers/waitingRoom.js';

const router = express.Router();

/*
    path from root: /waitingRoom/createWaitingRoom
*/
router.post('/createWaitingRoom', createWaitingRoom)

export default router;