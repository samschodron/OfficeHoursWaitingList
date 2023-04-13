import waitingRoomRoutes from './routes/waitingRoom.js'
import studentRoutes from './routes/student.js'
import bodyParser from "body-parser";
import cors from "cors";
import { VerifyToken } from "./middleware/verifyToken.js"

import express from 'express'
const app = express()
const port = process.env.PORT || 4000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

// parse token and get the uid for each request
app.use('/', VerifyToken)

app.use('/waitingRoom', waitingRoomRoutes)
app.use('/student', studentRoutes)

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})
