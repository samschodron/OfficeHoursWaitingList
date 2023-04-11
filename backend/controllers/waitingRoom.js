import db from '../dbconfig.js'
import crypto from 'crypto'
import { createWaitingRoomSchema } from './validators/waitingRoomValidator.js'

function generateUniqueRoomCode(size = 12) {
    return crypto.randomBytes(size).toString('hex');
}

export const createWaitingRoom = async (req, res) => {
    const { body } = req;
    try {
        const data = createWaitingRoomSchema.validateSync(body, { abortEarly: false, stripUnknown: true });
        let teachingAssistantFirstName = data['teaching_assistant_first_name']
        let teachingAssistantlastName = data['teaching_assistant_last_name']
        let waitingRoomName = data['waiting_room_name']

        let roomCode = generateUniqueRoomCode()

        let sqlQuery = `INSERT INTO teaching_assistant (room_code_pk, teaching_assistant_first_name, teaching_assistant_last_name, time_created, waiting_room_name) VALUES ("${roomCode}", "${teachingAssistantFirstName}", "${teachingAssistantlastName}", now(), "${waitingRoomName}")`;

        db.query(sqlQuery, function (error, result, fields) {
            if (error) {
                res.status(400).json({ message: 'failed to create a waiting room' })
                throw error;
            } else {
                return res.json({
                    message: 'successfully created waiting room',
                    data,
                    room_code: roomCode,
                    waiting_room_name: waitingRoomName
                });
            }
        })
    } catch (error) {
        return res.status(422).json({ errors: error.errors });
    }
}

export const getAllStudentsInWaitingRoom = async (req, res) => {
    const queryParams = req.query
    try {
        if (!queryParams.roomCode) {
            return res.status(422).json({ errors: 'roomCode query param is required' });
        }
        const roomCode = queryParams.roomCode
        let sqlQuery = `SELECT studentID_pk, student_first_name, student_last_name, time_entered FROM student WHERE is_waiting = 1 AND room_code_pk = "${roomCode}" ORDER BY time_entered;`

        db.query(sqlQuery, function (error, result, fields) {
            if (error) {
                res.status(400).json({ message: 'failed to retrieve list of students in the waiting room' })
                throw error;
            } else {
                return res.json({
                    message: 'successfully retrieved list of students in the waiting room',
                    query_result: result
                })
            }
        });
    } catch (error) {
        console.log('error here')
        return res.status(422).json({ errors: error.errors });
    }
}