const express = require('express')
const routeruser = express.Router()
const User = require('../../models/User')
const bodyParser = require('body-parser')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')
routeruser.post('/register',(req,res)=>{
    const email = req.body.email
 User.findOne({email}).then(user=>{
    if(user){
         res.status(200).json({msg:"User Exist"})
    }
    else 
    {
        const newUser = new User({
            name:req.body.name,
            email:req.body.email,
            avatar:gravatar.url(req.body.email,{s:"200",r:"pg",d:"mm"}),
            password:req.body.password
        
        })
        newUser.save();
        res.send(newUser)
    }


    
    
 })



 
   





})








//login 
routeruser.post('/login',(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    
User.findOne({email}).then(user=>{

    if(user)
    {
        bcrypt.compare(password,user.password).then(isMatch=>{
            if(isMatch)
            {
            jwt.sign({id:user.id,avatar:user.avatar,name:user.name},keys.secrateKey,{expiresIn:3600},(err,token)=>{
res.json({success:true,
    token:'Bearer ' + token
})

            })
            }
            else
            {
                res.status(400).json({msg:" email & password don't match"})
            }
        })


    }

})


    
    
 })

 routeruser.get('/current',passport.authenticate('jwt',{session:false}),(req,res)=>{
    res.json(req.user)
})
module.exports = routeruser