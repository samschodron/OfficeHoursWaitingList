const express = require('express')
const port = process.env.PORT || 31415

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})