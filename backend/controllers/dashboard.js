import db from '../dbconfig.js'

export const getAllOpenWaitingLists = async (req, res) => {
    const { body } = req;
    const user_id = req.app.locals.uid;

    try {
        let sqlQuery = `SELECT teaching_assistant_first_name, teaching_assistant_last_name, waiting_room_name, room_code_pk FROM teaching_assistant WHERE time_destroyed is NULL AND user_id = "${user_id}" ORDER BY time_created;`

        db.query(sqlQuery, function (error, result, fields) {
            if (error) {
                res.status(400).json({ message: `failed to retrieve all open waiting lists created by user ${user_id}` })
                throw error;
            } else {
                return res.json({
                    message: `successfully retrieved all open waiting lists created by user ${user_id}`,
                    query_result: result
                })
            }
        })
    } catch (error) {
        res.status(422).json({ errors: error.error })
    }
}