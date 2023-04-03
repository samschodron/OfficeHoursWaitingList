import db from '../dbconfig.js'
import { joinWaitingRoomSchema, leaveWaitingRoomSchema } from './validators/studentValidators.js'

/* PARAMS: The room code of list student is trying to join and student name.
   This function creates a SQL insert statement that adds the student to 
   the wait list.
    */
export const joinWaitingRoom = async (req, res) => {
    const { body } = req;
    try {
        const data = joinWaitingRoomSchema.validateSync(body, { abortEarly: false, stripUnknown: true });

        let studentFirstName = data['student_first_name']
        let studentLastName = data['student_last_name']
        let roomCode = data['room_ID']

        db.query(`INSERT INTO student (student_first_name, student_last_name, time_entered, time_left, room_code_pk, is_waiting) VALUES ('${studentFirstName}', '${studentLastName}', now(), null, '${roomCode}', 1); SELECT LAST_INSERT_ID();`, function (err, result, fields) {
            if (err) {
                res.status(400).json({ message: 'failed to join a waiting room' })
                throw err;
            }
            console.log(result);
        })

        return res.json({
            message: "result",
            data,
            room_code: roomCode
        });
    } catch (error) {
        return res.status(422).json({ errors: error.errors });
    }
}

/* PARAMS: The id of the student leaving the table.
   This function creates a SQL UPDATE statement that removes the student from 
   the wait list.
    */
export const leaveWaitingRoom = async (req, res) => {
    const { body } = req;
    try {
        let time = Date.now();
        let id = data['studentID_pk']

        // Searches db to see if student is in the waiting list 
        db.query(`SELECT * FROM student WHERE studentID_pk= ${id} AND isWaiting = 1`, function(err, row) {

            // If student exists in database, remove from wait list
            if (err) {
                res.status(400).json({ message: 'student doesn\'t exist!' })
                throw err;
            }
            else {
                if (row && row.length ) {
                    db.query(`UPDATE room_visitors SET time_left = ${time}, is_waiting = 1 WHERE visitor ID = ${id}`, function (err, result, fields) {
                        if (err) throw err;
                        console.log('Successfully removed from wait list.');
                    })
                } else {
                    console.log('Student was not found in list!');
                }
            }

        });
    } catch (error) {
        return res.status(422).json({ errors: error.errors });
    }
}