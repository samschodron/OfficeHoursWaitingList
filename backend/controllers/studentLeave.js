import db from '../dbconfig.js'

/* PARAMS: The id of the student leaving the table.
   This function creates a SQL UPDATE statement that removes the student from 
   the wait list.
    */
function studentLeave(id) {
    const time = Date.now();

    // Searches db to see if student is in the waiting list 
    db.query(`SELECT * FROM student WHERE studentID_pk= ${id} AND isWaiting = 1`, function(err, row) {

        // If student exists in database, remove from wait list
        if (err) {
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
}