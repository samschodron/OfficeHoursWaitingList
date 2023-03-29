import db from '../dbconfig.js'
import crypto from 'crypto'
import { createWaitingRoomSchema } from './validators/waitingRoomValidator.js'
import { getAllStudentsInWaitingRoomSchema } from './validators/waitingRoomValidator.js'

function generateUniqueRoomCode(size = 15) {
    return crypto
        .randomBytes(size)
        .toString('base64')
        .slice(0, size)
}

export const createWaitingRoom = async (req, res) => {
    const { body } = req;
    try {
        const data = createWaitingRoomSchema.validateSync(body, { abortEarly: false, stripUnknown: true });
        let teachingAssistantFirstName = data['teaching_assistant_first_name']
        let teachingAssistantlastName = data['teaching_assistant_last_name']

        let roomCode = generateUniqueRoomCode()

        let sqlQuery = `INSERT INTO teaching_assistant (room_code_pk, teaching_assistant_first_name, teaching_assistant_last_name, time_created) VALUES ('${roomCode}', '${teachingAssistantFirstName}', '${teachingAssistantlastName}', now())`;

        db.query(sqlQuery, function (error, result, fields) {
            if (error) {
                res.status(400).json({ message: 'failed to create a waiting room' })
                throw error;
            }
        })

        return res.json({
            message: 'successfully created waiting room',
            data,
            room_code: roomCode
        });
    } catch (error) {
        return res.status(422).json({ errors: error.errors });
    }
}

export const getAllStudentsInWaitingRoom = async (req, res) => {
    const { body } = req
    try {
        const data = getAllStudentsInWaitingRoomSchema.validateSync(body, { abortEarly: false, stripUnknown: true })
        console.log(data)
        const roomCode = data['room_code_pk']
        console.log(roomCode)

        let sqlQuery = `SELECT student_first_name, student_last_name FROM student WHERE is_waiting = 1 AND room_ID = '${roomCode}' ORDER BY time_entered DESC;`

        let queryResult;

        db.query(sqlQuery, function (error, result, fields) {
            queryResult = result;
            console.log(result)
            if (error) {
                console.log('here 1')
                res.status(400).json({ message: 'failed to retrieve list of students in the waiting room' })
                throw error;
            }
        });
        // console.log(result)

        if (queryResult) {
            console.log(true)
        } else {
            console.log(false)
        }
        return res.json({
            message: 'successfully retrieved list of students in the waiting room'
        })
    } catch (error) {
        console.log('here 2')
        return res.status(422).json({ errors: error.errors });
    }
}