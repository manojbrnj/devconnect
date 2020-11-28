const express = require('express')
const routerPosts = express.Router()


routerPosts.get('/test',(req,res)=>{
    res.json({status: 200,msg:"this is posts.js"})
     res.send('hello')
})
module.exports = routerPosts