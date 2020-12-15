const passport = require('passport')
const mongoose = require('mongoose')
const User = require('../../models/User')
const Profile = require('../../models/Profile')
const validateProfileInput = require('../../validation/profile')
const validateExperienceInput = require('../../validation/experince')
const validationEducationInput = require('../../validation/education')
const profileRoute = require('express').Router()
var error ={}
mongoose.set('useFindAndModify', false);
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
    Profile.findOne({user:req.user.id}).populate('user',['name','email']).then(profile=>{
     if(!profile)
     {
         error.noprofile = "there is no profile";
         return res.status(404).json(error)
     }
     res.json(profile)
    })


})
// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
profileRoute.post('/',passport.authenticate('jwt', { session: false }),(req, res) => {
      var { errors, isValid } = validateProfileInput(req.body);
  
      // Check Validation
      if (!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
      }
  
      // Get fields
      var profileFields = {};
      profileFields.user = req.user.id;
      if (req.body.handle) profileFields.handle = req.body.handle;
      if (req.body.company) profileFields.company = req.body.company;
      if (req.body.website) profileFields.website = req.body.website;
      if (req.body.location) profileFields.location = req.body.location;
      if (req.body.bio) profileFields.bio = req.body.bio;
      if (req.body.status) profileFields.status = req.body.status;
      if (req.body.githubusername)
        profileFields.githubusername = req.body.githubusername;
      // Skills - Spilt into array
      if (typeof req.body.skills !== 'undefined') {
        profileFields.skills = req.body.skills.split(',');
      }
  
      // Social
      profileFields.social = {};
      if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
      if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
      if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
      if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
      if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

      Profile.findOne({ user: req.user.id }).populate().then(profile => {
        if (profile) {
          // Update
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          ).then(profile => res.json(profile));
        } else {
          // Create
          // Check if handle exists
          Profile.findOne({ handle: profileFields.handle }).then(profile => {
            if (profile) {
              errors.handle = 'That handle already exists';
              res.status(400).json(errors);
            }
  
            // Save Profile
            new Profile( profileFields).save().then(profile => res.json(profile));
          });
        }
      });
    }
  );
// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private


profileRoute.get('/all',(req,res)=>{
 
  Profile.find().populate('user',['name','email']).then(profile=>{
    if(!profile)
    {
      error.noprofile = "there is no profile"
      res.status(404).json(error)
    }
    res.status(200).json(profile)
  })


})
 // @route   POST api/profile
// @desc    Create experience profile
// @access  Private

profileRoute.post('/experience',passport.authenticate('jwt',{session:false}),(req,res)=>{
var {errors,isValid} = validateExperienceInput(req.body)
Profile.findOne({user:req.user.id}).then(profile=>{
if(!profile)
{
  errors.noprofile = "there is no profile"
  res.status(404).json(errors)
}
var newExperience = {
  title: req.body.title,
  company: req.body.company,
  location: req.body.location,
  from: req.body.from,
  to: req.body.to,
  current: req.body.current,
  description: req.body.description,
}
 
profile.experience.unshift(newExperience) 
profile.save().then(profile=>{
  res.json(profile)
})


})

})

// @route   POST api/education
// @desc    add education profile
// @access  Private



profileRoute.post('/education',passport.authenticate('jwt',{session:false}),(req,res)=>{
 var {errors,isValid} = validationEducationInput(req.body)
  // Check Validation
  if (isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }
let newEducation = {
school:req.body.school,
degree:req.body.degree,
fieldofstudy:req.body.fieldofstudy,
from:req.body.from,
to:req.body.to,
current:true,
description:req.body.description
}

Profile.findOne({user:req.user.id}).then(profile=>{


if(!profile)
{
  errors = "no profile"
  return res.status(404).json({msg:"create profile"})
}

profile.education.unshift(newEducation)
profile.save().then(profile=>{
  return res.status(200).json(profile)
})


})




})











// @route   delete api/experience
// @desc   delete education profile
// @access  Private



profileRoute.delete('/experience/:exp_id',passport.authenticate('jwt',{session:false}),(req,res)=>{



Profile.findOne({user:req.user.id}).then(profile=>{


const removeindex = profile.experience.map(item=>item.id).indexOf(req.params.exp_id)

profile.experience.splice(removeindex,1)

profile.save().then(profile=>res.json(profile))


})




})


// @route   delete api/education
// @desc   delete education profile
// @access  Private



profileRoute.delete('/education/:edu_id',passport.authenticate('jwt',{session:false}),(req,res)=>{



  Profile.findOne({user:req.user.id}).then(profile=>{
  
  
  const removeindex = profile.education.map(item=>item.id).indexOf(req.params.edu_id)
  
  profile.education.splice(removeindex,1)
  
  profile.save().then(profile=>res.json(profile))
  
  
  })
 })




 
// @route   delete api/user
// @desc   delete user
// @access  Private



profileRoute.delete('/user/delete',passport.authenticate('jwt',{session:false}),(req,res)=>{



  Profile.findOne({user:req.user.id}).then(profile=>{
  
  profile.deleteOne({user:req.user.id}).then(()=>{

    User.deleteOne({_id:req.user.id}).then(()=>{
      res.json({msg:"user removed from database"})
    })
  })
  
  
  })
 })








module.exports =profileRoute