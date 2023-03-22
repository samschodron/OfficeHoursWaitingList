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

// set up db connection
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "avocado.ciip1144g4cq.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "teamAvocado!",
    port: "3306",
    database: "office_hours_waiting_list",
    // host: process.env.DB_HOST,
    // port: process.env.DB_PORT,
    // user: process.env.DB_USER,
    // password: process.env.DB_PASSWORD,
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

connection.end();