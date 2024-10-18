const express = require("express");
const path = require("path");
const app = express();
const port = 4000||process.env.port;
const bodyParser = require('body-parser')
const cookieparser = require('cookie-parser')
require('dotenv').config()
const authRoute = require('./routes/authRoutes')
const connectToUserDb = require("./db/user")


//connect to user database by calling the 
//function we reuired from user.js script in db folder
connectToUserDb()

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Set EJS as the templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


//allows us to use json data from req(converts json data to usable js)
app.use(express.json())

app.use(express.urlencoded({
    extended: true
}));

//so we can make use of the req.body
app.use(bodyParser.urlencoded({ extended: false }))

//so we can make access the cookies in a client browser
app.use(cookieparser())

// parse application/json
app.use(bodyParser.json())




//set app to use express routes
app.use("/",authRoute);

app.listen(port, () => {
  console.log(`app is listening to port ${port}`);
});
