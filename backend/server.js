import waitingRoomRoutes from './routes/waitingRoom.js'
import bodyParser from "body-parser";
import cors from "cors";

import express from 'express'
const app = express()
const port = process.env.PORT || 31415

// for parsing application/ json
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.use('/waitingRoom', waitingRoomRoutes)

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})

// to test db connection
// import db from './dbconfig.js'

// db.query("SELECT * FROM teaching_assistant", function (err, result, fields) {
//     if (err) throw err;
//     console.log('result: ', result);
// })
