import waitingRoomRoutes from './routes/waitingRoom.js'
import bodyParser from "body-parser";

// Define "require"
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const express = require('express')
const app = express()
const port = process.env.PORT || 31415

// for parsing application/ json
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

app.use('/waitingRoom', waitingRoomRoutes)

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})