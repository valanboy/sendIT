const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config()


//connect to user db
const dbUrl = process.env.mongoDbUrl
const connectTomongoBd = async() => {
    mongoose.connect("mongodb+srv://believegilbert20:garri4me@cluster0.s8mu1py.mongodb.net/sendit?retryWrites=true&w=majority&appName=Cluster0"
, {
        useUnifiedTopology: true,
      })
        .then(() => console.log('Connected to MongoDB!'))
        .catch((error) => console.error('Error connecting to MongoDB:', error));
}

module.exports = connectTomongoBd