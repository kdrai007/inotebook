//coneccting to mongoose
const ConnectoMongoose = require('./Database')
//conecting to cors
var cors = require('cors')
//connecting to express
const express = require('express')
//calling the funtion of connectMongoose from datbase.js file
ConnectoMongoose()
const app = express()
const port = 5000
//using cors as a middleware
app.use(cors())

app.use(express.json())

//Avilable routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`Inotebook backend  listening at http://localhost:${port}`)
})