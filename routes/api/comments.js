const express = require('express')
const routerComments = express.Router()


routerComments.get('/test',(req,res)=>{
    res.json({status: 200,msg:"this is commets.js.js"})
   
})
module.exports = routerComments