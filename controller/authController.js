const user = require("../models/user");
const jwt = require("jsonwebtoken")
require('dotenv').config()
const JwtSecret =  "garri4me" //env not loading properly but will crosscheck
const bcrypt = require('bcryptjs')

//create json token that we can call later in this script
const maxAge = 2 * 24 * 60 * 60
const createToken = (id) => {

    return jwt.sign({ id } , JwtSecret, {
        expiresIn: maxAge
    })
}


const home_GET = (req, res) => {
    res.render("index");
};

const whatsapp_GET = (req, res) => {
    res.redirect("https://wa.me/+2349036454022?text=urlencodedtext");
};
const signin_GET = (req, res) => {
    res.render("signin",{
        error: ""
    });
};

const signup_GET = (req, res) => {
    res.render("signup",{
        error:""
    });
};

const signup_POST = async (req, res) => {
    let { email, username, password } = req.body;
    try {

        //check if the email already exists in the database
        const userExist = await user.findOne({ email: email });
        if (userExist) {
            res.render("signup", {
                error: "email already exist",
            });
        } else if (!userExist) {

            //create a user in database
            const User = await user.create({ email, username, password })
            console.log(JwtSecret)
            //create a user with the callback function initialized at the start of this file
            const token = createToken(User._id)

            //sending the jwt as cookie to be saved in the client browser
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
            await res.status(200).redirect('/signin')
        }
    } catch (error) {
        console.log(error)
    }

};

const signin_POST = async (req, res) => {
    try{
    //get the email and password from the req body by destructuring
    let { email, password } = req.body

    //check database to find user
    const User = await user.findOne({email: email})

    //if no user is found throw an error and rerender signin page
    if(!User){
        res.render('signin',{
            error: 'user not found, please sign up'
        })
    }

    //if there is a user then compare
    // the user input password with the hashed password from the database
  if(User){
    const dbPassword = User.password
    const comparedPassword = await bcrypt.compare(password, dbPassword)
  
  if(User && comparedPassword === true){
    //create a jwt token with the createToken 
    //call back function at the start of the script
    const token = createToken(User._id)

    //send the token as cookie to the client's browser
    res.cookie('jwt', token, {httpOnly: true, maxAge:maxAge * 1000})

    //redirect the lpogged-in user to the 
    //dashboard with the username as a query parameter
    res.redirect(`/dashboard?username=${encodeURIComponent(User.username)}`)
  }
     //if there's a user but his password is false then rerender signin page with error
  else if(User && comparedPassword === false){
     res.render('signin',{
        error: 'incorrect username or password'
     })
  }
}
}
catch(error){
    console.log(error)
}
}

const dashboard = async (req, res)=>{
    //extract the username from the query parameter we were redirected from
    const username = req.query.username
   res.render('dashboard',{
    username: username
   })
}

const signout = async (req, res)=>{
res.cookie('jwt', " ", {maxAge: 1})
res.redirect("/")
}

module.exports = {
    home_GET,
    whatsapp_GET,
    signin_GET,
    signup_GET,
    signin_POST,
    signup_POST,
    dashboard,
    signout
};
