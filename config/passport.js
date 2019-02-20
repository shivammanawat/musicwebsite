//loading package
const JwtStrategy = require('passport-jwt').Strategy; // implemeting strategy
const ExtractJwt = require('passport-jwt').ExtractJwt; // extracting jwt
const User = require('../model/users');
const config = require('../config/database');

//exporting passport function
module.exports = function(passport) {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
      //finding user by user id
      User.getUserById(jwt_payload._id, (err, user) => {
        if(err) {
          return done(err, false);
        }
        if(user) {
          return done(null, user);
        } 
        else {
          return done(null, false);
        }
      });
    }));
  }





