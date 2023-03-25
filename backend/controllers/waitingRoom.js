// Define "require"
import { createRequire } from "module";
// const require = createRequire(import.meta.url);

// const db = import('../dbconfig')

export const createWaitingRoom = async (req, res) => {
    try {
        console.log(req.body)
        res.status(200).json({ message: 'waiting room created successfully' })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// db.query("SELECT * FROM teaching_assistant", function (err, result, fields) {
//     if (err) throw err;
//     console.log('result: ', result);
// })