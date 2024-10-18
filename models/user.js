const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
     username:{
            type: String,
    },
      email:{
           type: String,
           required: true,
           unique: true
      },
       password:{
        type: String,
        required: true
       }
    })
   
     //hash password before it is saved
     userSchema.pre('save', async function(next){
        try{
            const salt = await bcrypt.genSalt()
            this.password = await bcrypt.hash(this.password, salt)
            console.log("password is hashed just before saving this user")
            next()
        }catch(error){
            console.log(error)
        }
     })

    const user = mongoose.model('user', userSchema)

    module.exports = user