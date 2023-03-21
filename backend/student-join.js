/* PARAMS: The room code of list student is trying to join and student name.
   This function creates a SQL insert statement that adds the student to 
   the 
    */
function studentJoin(code, name) {
    /* Going to need to create some sort of random number generator
       and check if the ID is in the table. */

    const id = 1; // TODO: decide how we want to generate unique ID
    const time = Date.now();
    const sqlInsert = "INSERT INTO @@room_visitors (visitor_id, room_code, visitor_name, time_entered, time_left)";
    const values = (`(${id}, ${code}, ${name}, ${time}, NULL);`);

    // Need to find out how to connect to database to finish
}