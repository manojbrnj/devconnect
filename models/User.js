const {connection,Schema} = require('mongoose')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);
const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    avatart:{
        type:String,
      
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
       default:Date.now()
    }

})


UserSchema.pre('save', async function(next){


try {
    const salt =await bcrypt.genSalt(10);
 const hash =await bcrypt.hash(this.password,salt);

 this.password = hash;
 next()
} catch (error) {
    next(error)
}

})
const user = connection.model("users",UserSchema)

module.exports = user