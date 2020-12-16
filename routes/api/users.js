const express = require('express')
const routeruser = express.Router()
const User = require('../../models/User')
const bodyParser = require('body-parser')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')
const validateRegidter = require('../../validation/register')
const loginValidator = require('../../validation/login')

// register user 
// route api/users/register
// desc resgister new user
// public 
routeruser.post('/register', (req, res) => {
    const { errors, isValid } = validateRegidter(req.body);
    if (!isValid) {
        return res.status(400).json(errors)
    }

    const email = req.body.email
    User.findOne({ email }).then(user => {

        if (user) {
            res.status(200).json({ msg: "User Exist" })
        }

        else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar: gravatar.url(req.body.email, { s: "200", r: "pg", d: "mm" }),
                password: req.body.password

            })
            newUser.save();
            res.send(newUser)
        }


    })

})

/// ends register here


// route api/users/login 
//@desc login and response with bearer t0ken
routeruser.post('/login', (req, res) => {
    const{errors,isValid} = loginValidator(req.body);
    const email = req.body.email;
    const password = req.body.password;

  if(!isValid)
  {
res.status(400).json({msg:" username or password is wrong",errors})
 }

    User.findOne({ email }).then(user => {

        if (user) {
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    jwt.sign({ id: user.id, avatar: user.avatar, name: user.name }, keys.secrateKey, { expiresIn: 360000000 }, (err, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        })

                    })
                }
                else {
                    res.status(400).json({ msg: " email & password don't match" })
                }
            })


        }

        else {
            res.status(404).json({msg :"user not found",errors})
        }

    })




})

routeruser.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json(req.user)
})



routeruser.get('/all', (req, res) => {
    User.find().then(user => {
        return res.status(200).json(user)
    })
})



module.exports = routeruser