require('dotenv').config()
const jwt = require("jsonwebtoken")

const JwtSecret = "garri4me" //.env not loading correctly

//check json web token exists & is verified
const requireAuth = (req, res, next) => {
     const token = req.cookies.jwt
     if(!token){
      res.redirect("/signin")
      next()
     }
else if(token){
    jwt.verify(token, JwtSecret, (err, decodedToken)=>{
      if(err){
        console.log(err.message)
        res.redirect("/signin")
      }else{
        console.log(decodedToken)
        next()
      }
    })
}

}

module.exports = requireAuth