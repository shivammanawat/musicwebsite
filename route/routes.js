//loading package
const express = require("express");
const router = express.Router();
const User = require("../model/users");
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Google= require('../model/google');
const passport = require('passport');
//register route for user
router.post("/register",function(req,res)
{
        let newUser = new User(
        {
            username : req.body.username,
            password: req.body.password
        });
        User.addUser( newUser , function(err,user)
        {
            if(err)
            {
                res.json({success: false, msg: 'Not Registered'});
            }
            else
            {
                res.json({success: true, msg: 'User Registered'});
            }
        });
});

//login route for user
router.post('/login', (req, res) => {
            const username = req.body.username;
            const password = req.body.password;
            //searching user by username
            User.getUserByUsername(username, (err, user) => 
            {
                    if(err) 
                    {
                    console.log(err);
                    }
                    //when it is not the user who is trying to login
                    if(!user){
                        return res.json({success: false, msg: 'User Not Found'});
                    }
                    //password matching
                    User.comparePassword(password, user.password, (err, isMatch,next) => 
                    {
                      
                        if(err) next(err);;
                        if(isMatch)
                        {
                            //creatig token by using jsonwebtoken
                            const token = jwt.sign(user.toJSON(), config.secret, {
                                expiresIn: 604800 // validity = 1 week
                            });
                            //sending response
                            res.json({
                                success: true,
                                token: 'JWT '+token,
                                user: {
                                id: user._id,
                                username: user.username
                                }
                            });
                        } 
                        else 
                        {
                        return res.json({success: false, msg: 'Wrong Password'});
                        }
                     });
            });
  });


// -----------------------------------google sign in--------------------------------------

var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

// used to serialize the user for the session
passport.serializeUser(function (user,done) {
  console.log("in serializeUser user");
  done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    console.log("In deserialize user");
      done(err, user);
  });
});

//-------------------------------------google strategy-----------------------------------
passport.use(new GoogleStrategy
(
  {
        clientID:  '105578132595-7qmv3uhfuisnr3qr66f764bh0n6juk2h.apps.googleusercontent.com'  ,
        clientSecret: 'd4zV2WdgQDs3pUajCSHzHrnq',
        callbackURL: "http://localhost:3000/users/auth/google/callback",
        passReqToCallback : true
  },
  function( request, res,accessToken, refreshToken, profile,done)
  {             
                console.log(profile.id);
                Google.findOne
                  (    {
                            googleId: profile.id,
                        }, 
                        function (  err, user ) 
                        {          
                          
                          if(err)
                          {
                            throw err;
                          }   
                                // sending response
                          // No user was found... so create a new user with values from 
                          if ( !user ) 
                          {
                            
                                user = new Google
                                ({
                                  googleId: profile.id,
                                  name: profile.displayName,
                                  username: profile.displayName,
                                  provider: 'google',
                                  google: profile._json,
                                });
                          
                                 // found user. Return
                                
                                user.save(function (err,user)
                                {
                                  if (err)
                                   {
                                     console.log("err");
                                   }
                                   console.log("save");      

                               
                                     
                                console.log(user);
                                   
                                user.jwtoken = jwt.sign(user.toJSON(), config.secret, {
                                  expiresIn: 604800 // validity = 1 week
                                  });

                                  console.log(user.jwtoken)  
                                   done(null, user); 
                                });
                          } 
                          else 
                          {             
                            user.jwtoken = jwt.sign(user.toJSON(), config.secret, {
                              expiresIn: 604800 // validity = 1 week
                                });
                            console.log(user);      
                            console.log(user.jwtoken) ;            
                                  // return 
                                  done(null, user);
                          }
                          
                  });
  }
));
  
router.get('/auth/google',passport.authenticate('google',
    {
        scope: [  'https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.profile.emails.read']
    }
));
//
//

router.get('/auth/google/callback',
        passport.authenticate('google', {
          session: false
        }), (req, res ) => {
          if (req.user.jwtoken) {
            console.log(req.user.jwtoken)  
           return res.json({
              success: true,
              token:'JWT' + req.user.jwtoken
            })
          } else {
            res.json({
              success: false
            });
          }
        }
      )


//exporting router module
module.exports = router;















//   const JwtStrategy = require('passport-jwt').Strategy; // implemeting strategy
//   const ExtractJwt = require('passport-jwt').ExtractJwt; // extracting jwt




// // Set up passport strategy
// passport.use(new GoogleStrategy(  
//   {
//     clientID: '105578132595-7qmv3uhfuisnr3qr66f764bh0n6juk2h.apps.googleusercontent.com'  ,
//     clientSecret: 'd4zV2WdgQDs3pUajCSHzHrnq',
//     callbackURL: "http://localhost:3000/users/auth/google/callback",
//     scope: ['email']
//   },
//   // This is a "verify" function required by all Passport strategies
//   (accessToken, refreshToken, profile, cb) => {
//     console.log('Our user authenticated with Google, and Google sent us back this profile info identifying the authenticated user:', profile);
//     return cb(null, profile);
//   },
// ));
// ;


// // We'd also need to give our front-end SPA control over the routing,
// // so when it redirects to /saveToken, the server sends back the homepage
// // this lets the front-end router take it from there
// // router.get('/saveToken', function(req, res) {  
// //   res.sendFile(__dirname + '/public/index.html')
// // });

// // This is where users point their browsers in order to get logged in
// // This is also where Google sends back information to our app once a user authenticates with Google


// router.get('/auth/google/callback',  
//   passport.authenticate('google', { failureRedirect: '/', session: false }),
//   (req, res) => {
//    user=req.user;
//     const token = jwt.sign(user, config.secret, {
//       expiresIn: 604800 // validity = 1 week
//   });
//     const htmlWithEmbeddedJWT = `
//     <html>
//       <script>
//         // Save JWT to localStorage
//         window.localStorage.setItem('JWT', '${token}');
//         // Redirect browser to root of application
//         window.location.href = 'http://localhost:4200/';
//       </script>
//     </html>
//     `;

//     res.send(htmlWithEmbeddedJWT);
//   }
// );


// router.get('/auth/google', passport.authenticate('google'));  




