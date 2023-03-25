import express from 'express'
import { createWaitingRoom } from '../controllers/waitingRoom.js';

const router = express.Router();

/*
    path from root: /waitingRoom/createWaitingRoom
*/
router.get('/createWaitingRoom', createWaitingRoom)

export default router;