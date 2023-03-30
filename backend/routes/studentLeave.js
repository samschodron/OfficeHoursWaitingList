import express from 'express'
import { leaveWaitingRoom } from '../controllers/student.js';

const router = express.Router();

/*
    path from root: /student/leaveWaitingRoom
*/
router.post('/leaveWaitingRoom', leaveWaitingRoom)

export default router;