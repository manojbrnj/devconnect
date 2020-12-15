const express = require('express')
const routerPosts = express.Router()
const Post = require('../../models/Post')
const passport = require('passport')
const User = require('../../models/User')

const ValidatorPost = require('../../validation/posts')
const profileRoute = require('./profile')
const Profile = require('../../models/Profile')
const profile = require('../../validation/profile')
const { route } = require('./profile')

//@route /api/posts/post/all
//@desc create a new post store id inside like
//@private
routerPosts.get('/post/all', (req, res) => {
    Post.find().sort({ date: -1 }).then(post => {
        res.json(post)
    })
})

//@route /api/posts/post/all
//@desc create a new post store id inside like
//@private
routerPosts.get('/post/:id', (req, res) => {
    Post.findById(req.params.id).then(post => {
        res.json(post)
    })
})

//@route /api/posts/post
//@desc create a new post store id inside like
//@private
routerPosts.post('/post', passport.authenticate('jwt', { session: false }), (req, res) => {



    const PostNew = new Post({
        user: req.user.id,
        text: req.body.text,
        name: req.user.name,
        avatar: req.user.name
    })
    PostNew.save().then(post => res.json(post))

})






routerPosts.delete('/post/:id', passport.authenticate('jwt', { session: false }), (req, res) => { 

  Profile.find({user : req.user.id}).then(profile=>{

    Post.findById(req.params.id).then(post => {
        post.remove().then(() => {
            res.json({ msg: "success" })
        }).catch(err=>{return res.json({msg:"no post found"})})
    }).catch(err=>{ return res.json({msg:"no post found"})})
  })

})

//@route api/post/like/:id
//@ desc like post
//@private

routerPosts.post('/post/likes/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{

    Profile.findOne({ user: req.user.id }).then(profile => {
        Post.findById(req.params.id).then(post => {
            if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {

                return res.json({ msg: "liked",post })


            }

            post.likes.unshift({ user: req.user.id })
            post.save().then(() => {
                return res.json({ msg: "user likes post",post })
            })


        })

    })


})



//@route api/post/removelike/:id
//@ desc uremovelike post
//@private

routerPosts.post('/post/removelikes/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{

    Profile.findOne({ user: req.user.id }).then(profile => {
        Post.findById(req.params.id).then(post => {
            if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {

                return res.json({ msg: "not liked ppost so how you can remove like" })


            }

        const removeINdex =post.likes.map(item=>item.id).indexOf(req.param.id);

        post.likes.splice(removeINdex,1);
        post.save().then(()=>{res.json({msg:"like remove kar diya",post})})


        })

    })


})

//@ route /post/comment/
//#desc create comment
//@ private
routerPosts.post ('/post/comment',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const comments={user:req.user.id,text:req.body.text,name:req.user.name}
Profile.findOne({user:req.user.id}).then(profile=>{
    Post.findOne({user:req.user.id}).then(post=>{
             


post.comment.unshift(comments);
post.save()
return res.json(post.comment)


    })
})


})
//likes/5fd1cc6d02357a5bec6cd272
//@ route /post/comment/
//#desc create comment
//@ private
routerPosts.get ('/post/comment/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    
Profile.findOne({user:req.user.id}).then(profile=>{
    Post.findOne({user:req.params.id}).then(post=>{
             console.log("hiii")
             console.log((post.comment))

return res.json(post.comment)

    })
})


})

//likes/5fd1cc6d02357a5bec6cd272
//@ route /post/comment/
//#desc create comment
//@ private
routerPosts.delete ('/post/comment/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    
    Profile.findOne({user:req.user.id}).then(profile=>{
        Post.findOne({user:req.user.id}).then(post=>{
               const removeIndex = post.comment.filter(item=>item._id).indexOf(req.params.id);
               post.comment.splice(removeIndex,1)
    post.save()
    return res.json(post.comment)
    
        })
    })
    
    
    })


module.exports = routerPosts 