const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt =require('passport-jwt').ExtractJwt
const keys = require('./keys')
const mongoose = require('mongoose');
const User = mongoose.model("users")
const obj ={
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : keys.secrateKey

}


module.exports = passport =>{
    passport.use(new JwtStrategy(obj, function(jwt_payload, done) {
        console.log(jwt_payload)
        User.findById(jwt_payload.id, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });





        
    }));
}
