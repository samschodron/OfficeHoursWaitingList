import express from 'express'
import { joinWaitingRoom } from '../controllers/student.js';
import { leaveWaitingRoom } from '../controllers/student.js';

const router = express.Router();

/*
    path from root: /student/joinWaitingRoom
*/
router.post('/joinWaitingRoom', joinWaitingRoom)

/*
    path from root: /student/leaveWaitingRoom
*/
router.post('/leaveWaitingRoom', leaveWaitingRoom)

export default router;