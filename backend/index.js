//coneccting to mongoose
const ConnectoMongoose = require('./Database')
//connecting to express
const express = require('express')
//calling the funtion of connectMongoose from datbase.js file
ConnectoMongoose()
const app = express()
const port = 5000

app.use(express.json())

//Avilable routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})