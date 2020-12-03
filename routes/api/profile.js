const passport = require('passport')
const mongoose = require('mongoose')
const User = require('../../models/User')
const Profiel = require('../../models/Profile')
const profileRoute = require('express').Router()
//@route api/test
//@desc get user profile test
//@acces public
profileRoute.get('/test',(req,res)=>{
    res.json({msg:"profile"})


})

//@route api/profile
//@desc get user profile
//@acces private
profileRoute.get('/profile',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const error ={}
    Profiel.findOne({user:req.user.id}).then(profile=>{
     if(!profile)
     {
         error.noprofile = "there is no profile";
         return res.status(404).json(error)
     }
     res.json(profile)
    })


})
//@route api/profile
//@desc post/create user profile
//@acces private

profileRoute.post('/profile',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const error ={}
    Profiel.findOne({user:req.user.id}).then(profile=>{
     if(!profile)
     {
         error.noprofile = "there is no profile";
         return res.status(404).json(error)
     }
     res.json(profile)
    })


})



module.exports =profileRoute