const express = require('express')
const app = express()
const db = require('./config/database')
const users = require('./routes/api/users')
const comments = require('./routes/api/comments')
const posts = require('./routes/api/posts')
app.get('/',(req,res)=>{
res.send('hello world')
})

app.use('/api/users', users)
app.use('/api/comments', comments)
app.use('/api/posts', posts)

app.listen(5000,()=>{console.log('Server Started')})