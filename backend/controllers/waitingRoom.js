import db from '../dbconfig.js'
import crypto from 'crypto'
import { createWaitingRoomSchema } from './validators/waitingRoomValidator.js'

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