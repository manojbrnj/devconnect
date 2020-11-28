const mongoose = require('mongoose')
const db =mongoose.connect('mongodb://127.0.0.1:27017/',{useNewUrlParser:true,useUnifiedTopology:true},()=>{console.log('database Connected')})

module.exports = db