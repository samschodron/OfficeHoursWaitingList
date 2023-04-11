import express from 'express'
import { createWaitingRoom } from '../controllers/waitingRoom.js';
import { getAllStudentsInWaitingRoom } from '../controllers/waitingRoom.js';
import { destroyWaitingRoom } from '../controllers/waitingRoom.js';
const router = express.Router();

/*
    path from root: /waitingRoom/createWaitingRoom
*/
router.post('/createWaitingRoom', createWaitingRoom)

/*
    path from root: /waitingRoom/getAllStudentsInWaitingRoom
*/
router.get('/getAllStudentsInWaitingRoom', getAllStudentsInWaitingRoom)

/*
    path from root: /waitingRoom/destroyWaitingRoom
*/
router.post('/destroyWaitingRoom', destroyWaitingRoom)


export default router;