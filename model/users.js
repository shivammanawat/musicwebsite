//loading package
const mongoose = require("mongoose");
const config = require('../config/database');
const bcrypt = require("bcryptjs");//bcrypt package for generating hash password

// creating user schema
var UserSchema =  mongoose.Schema
({
  
    username: 
    {
        type: String,
        required: true,
        unique:true // each username to be unique
    },
    password:
    {
        type: String,
        required: true
    }

});

//exporting user module
const User = module.exports = mongoose.model('User', UserSchema);

//add user function
module.exports.addUser = function(newUser , callback)
{
    //generating hash password
    bcrypt.genSalt(9, function(err,salt)
    {
        bcrypt.hash(newUser.password,salt,function(err,hash)
        {
            if(err)
            console.log(err);
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

//get user by id
module.exports.getUserById = function(id,callback)
{
    User.findById(id,callback);
}

//get user by name
module.exports.getUserByUsername = function(username, callback)
{
    console.log(username);
    const query = { username : username};
    User.findOne( query, callback );
}

//comparing passsword for login by bcrypt hash compare
module.exports.comparePassword = function(candidatePassword, hash, callback){
        bcrypt.compare(candidatePassword, hash, (err, isMatch) =>{
            if(err) throw err;
            callback(null, isMatch);
        });
}
