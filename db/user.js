const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()


//connect to user db
const dbUrl = process.env.dbUrl

const connectTomongoBd = async() => {
    try{
       await mongoose.connect(dbUrl)
         mongoose.connection.on('connect', ()=>{
            console.log("connected to the user database successfully")
        })
    }catch(error){
         mongoose.connection.on('error', (err)=>{
            console.log('error connecting to mongodb user database!!!', err)
          })
    }
}

module.exports = connectTomongoBd