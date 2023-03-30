import express from 'express'
import { joinWaitingRoom } from '../controllers/student.js';

const router = express.Router();

/*
    path from root: /waitingRoom/createWaitingRoom
*/
router.post('/student', joinWaitingRoom)

export default router;