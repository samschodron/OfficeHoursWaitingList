
/* PARAMS: 
    */
   function studentLeave(id) {
    const time = Date.now();
    // Checks to see
    query(`SELECT * FROM STUDENT WHERE studentID_pk= ${id}`, function(err, row) {

        if(err) {
            logger.error('Error in DB');
            logger.debug(err);
            return;
        } else {
            if (row && row.length ) {
                const sqlUpdate = `UPDATE @@room_visitors SET time_left = ${time} WHERE visitor ID = ${id}`;
            } else {
                console.log('Student was not found in list!');
            }
        }

    });
}