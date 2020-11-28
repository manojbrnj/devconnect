const express = require('express')
const routerUsers = express.Router()


routerUsers.get('/test',(req,res)=>{
    res.json({status: 200,msg:"this is useres.js"})
    res.send('hello')
})
 module.exports = routerUsers