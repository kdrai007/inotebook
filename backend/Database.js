const mongoose = require('mongoose');
//url of mine database in mongo db server
const mongoURI="mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false"

const ConnectoMongoose=()=>{
    mongoose.connect(mongoURI,()=>{console.log("Connection with mongose established")});

}
module.exports= ConnectoMongoose;