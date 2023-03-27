import db from './dbconfig.js'

/* PARAMS: The room code of list student is trying to join and student name.
   This function creates a SQL insert statement that adds the student to 
   the wait list.
    */
function studentJoin(code, firstName, secondName) {
    const id = 1; // TODO: decide how we want to generate unique ID
    const time = Date.now();

    db.query(`INSERT INTO student (studentID_pk, student_first_name, student_last_name, time_entered, time_left, room_ID, is_waiting) VALUES (${id}, ${firstName}, ${secondName}, ${time}, NULL, ${code}, 1)`, function (err, result, fields) {
        if (err) throw err;
        console.log('Successfully added to the wait list.');
    })
}