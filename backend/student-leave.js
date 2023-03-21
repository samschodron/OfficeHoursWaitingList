/* PARAMS: 
    */
   function studentLeave(id) {
    const time = Date.now();
    const sqlUpdate = `UPDATE @@room_visitors SET time_left = ${time} WHERE visitor ID = ${id}`;

    // Need to find out how to connect to database to finish
}