const passport = require('passport')
const mongoose = require('mongoose')
const User = require('../../models/User')
const Profiel = require('../../models/Profile')
const validateProfileInput = require('../../validation/profile')
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
const {errors,isValid} = validateProfileInput(req.body)
    if(!isValid){
        return res.status(400).json(errors)
    }
    const error ={}

    const profileField =  {}
    if(req.body.user) profileField.user = req.body.id;
    if(req.body.handle) profileField.handle = req.body.handle;
    if(req.body.company) profileField.company = req.body.company;
    if(req.body.website) profileField.website = req.body.website;
    if(req.body.location) profileField.location = req.body.location;
    if(req.body.bio) profileField.bio = req.body.bio;
    if(req.body.status) profileField.status = req.body.status;
    if(req.body.githubuser) profileField.githubuser = req.body.githubuser;
    if(req.body.skills) profileField.skills = req.body.skills.split(',');
  profileField.social = {}

  if(req.body.youtube) profileField.socila.youtube = req.body.youtube;
  if(req.body.twitter) profileField.socila.twitter = req.body.twitter;
  if(req.body.facebook) profileField.socila.facebook = req.body.facebook;
  if(req.body.linkedin) profileField.socila.linkedin = req.body.linkedin;
  if(req.body.instagram) profileField.socila.instagram = req.body.instagram;

//    profileField.experience = {} 
//    if(req.body.school) profileField.experience.school = req.body.school;
//    if(req.body.degree) profileField.experience.degree = req.body.degree;
//    if(req.body.fieldofstudy) profileField.experience.fieldofstudy = req.body.fieldofstudy;
//    if(req.body.from) profileField.experience.from = req.body.from;
//    if(req.body.to) profileField.experience.to = req.body.to;
Profiel.findOne({user:req.user.id}).then(profile=>{
     
if(profile){
    Profiel.findOneAndUpdate({user:req.user.id},{$set:profileField},{new:true}).then(profile=>{ res.json(profile)})
}
else
{
   Profiel.findOne({handle:profileField.handle}).then(profile=>{
       if(profile){
           error.handle = "handle match profile already exist";
           res.status(400).json(error)
       }
       new Profiel (profileField).save().then(profile=>{
           return res.json(profile)
       })
   })

}
          



  
}).then(profile =>{
    res.json(profile)
})




 


})



module.exports =profileRoute