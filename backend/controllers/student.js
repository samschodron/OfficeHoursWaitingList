import db from '../dbconfig.js'
import { joinWaitingRoomSchema, leaveWaitingRoomSchema, findStudentSchema } from './validators/studentValidators.js'

/* PARAMS: The room code of list student is trying to join and student name.
   This function creates a SQL insert statement that adds the student to 
   the wait list.
    */
export const joinWaitingRoom = async (req, res) => {
    const { body } = req;
    const user_id = req.app.locals.uid

    try {
        const data = joinWaitingRoomSchema.validateSync(body, { abortEarly: false, stripUnknown: true });

        let studentFirstName = data['student_first_name']
        let studentLastName = data['student_last_name']
        let roomCode = data['room_code']

        // check if room exists
        db.query(`SELECT * FROM teaching_assistant WHERE room_code_pk= "${roomCode}"`, function (err, row) {
            if (err) {
                res.status(400).json({ message: 'failed to join room' })
                throw err;
            }
            else {
                if (row && row.length) {
                    // room exists -> now check if user has already joined the waiting list
                    let checkIfUserIsAlreadyWaitingInListQuery = `SELECT * FROM student WHERE room_code_pk = "${roomCode}" AND user_id = "${user_id}" AND is_waiting = 1`

                    db.query(checkIfUserIsAlreadyWaitingInListQuery, function (err, result, fields) {
                        if (result && result.length) {
                            // room exists and user has already joined this list
                            return res.status(403).json({ message: "user has already joined this waiting list." })
                        } else {
                            // room exists but user has not yet joined the list
                            db.query(`INSERT INTO student (student_first_name, student_last_name, time_entered, time_left, room_code_pk, is_waiting, user_id) VALUES ('${studentFirstName}', '${studentLastName}', now(), null, '${roomCode}', 1, '${user_id}');`, function (err, result, fields) {
                                if (err) {
                                    res.status(400).json({ message: 'failed to join a waiting room' })
                                    throw err;
                                }
                                console.log(result);
                            })

                            // retrieve id of user that just joined the list
                            db.query(`SELECT LAST_INSERT_ID() AS LastID;`, function (err, result, fields) {
                                if (err) {
                                    res.status(400).json({ message: 'failed to join a waiting room' })
                                    throw err;
                                }
                                let lastInsertedId = result[0].LastID

                                db.query(`SELECT waiting_room_name, teaching_assistant_first_name, teaching_assistant_last_name FROM teaching_assistant WHERE room_code_pk = '${roomCode}';`, function (err, result, fields) {

                                    return res.json({ message: 'successfully joined the waiting list', last_inserted_id: lastInsertedId, query_result: result[0] })
                                })
                            })
                        }
                    })
                } else {
                    console.log('List does not exist!');
                    return res.status(404).json({ message: "List does not exist!" });
                }
            }
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
        const data = leaveWaitingRoomSchema.validateSync(body, { abortEarly: false, stripUnknown: true });

        let id = data['studentID_pk']

        // Searches db to see if student is in the waiting list 
        db.query(`SELECT * FROM student WHERE studentID_pk= ${id} AND is_waiting = 1`, function (err, row) {

            // If student exists in database, remove from wait list
            if (err) {
                res.status(400).json({ message: 'failed to leave room' })
                throw err;
            }
            else {
                if (row && row.length) {
                    db.query(`UPDATE student SET time_left = now(), is_waiting = 0 WHERE studentID_pk = ${id}`, function (err, result, fields) {
                        if (err) throw err;
                        console.log('Successfully removed from wait list.');
                        return res.json({
                            message: 'Successfully removed from wait list.'
                        });
                    })
                } else {
                    console.log('Student was not found in list!');
                    return res.status(403).json({ message: "Student was not found in list!" });;
                }
            }

        });

    } catch (error) {
        return res.status(422).json({ errors: error.errors });
    }
}

/* Function to find the position of a student currently in a waitlist
     * @return  The current position of the student in the waiting list
     */
export const studentFind = async (req, res) => {
    const { body } = req;

    try {
        const data = findStudentSchema.validateSync(body, { abortEarly: false, stripUnknown: true });
        let id = data['studentID_pk']
        let roomCode = data['room_code_pk']
        let sqlQuery = `SELECT studentID_pk FROM student WHERE room_code_pk = "${roomCode}" AND is_waiting = 1 ORDER BY time_entered ASC`;

        // return a json and go through it to find matching student ID
        db.query(sqlQuery, function (error, result, fields) {
            // throws error if something goes wrong
            if (error) {
                res.status(400).json({ message: 'Student doesn\'t exist!' })
                throw error;
            }
            // prints result of the query
            else {
                var count = 0;
                for (var i = 0; i < result.length; i++) {
                    if (result[i].studentID_pk == id) {
                        count++;
                        break;
                    }
                    else {
                        count++;
                    }
                }

                return res.json({
                    message: count
                });
            }
        });
    }
    catch (error) {
        return res.status(422).json({ errors: error.errors });
    }


}
