import express from 'express'
import { createWaitingRoom } from '../controllers/studentLeave.js';

const router = express.Router();

/*
    path from root: /waitingRoom/createWaitingRoom
*/
router.post('/leaveWaitingRoom', createWaitingRoom)

export default router;