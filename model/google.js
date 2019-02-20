
const mongoose = require('mongoose');
const config = require('../config/database');

    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
const GoogleSchema = new Schema({
    provider:  String,
    googleId:  String,
    accessToken: String,
    name : String,
    email : String,
    userId: {type: ObjectId, ref: 'User'},
    dateAdded: {type: Date, default: Date.now}
});
const Google=module.exports = mongoose.model('Google',GoogleSchema);

module.exports.getGoogle = function(callback){
    Google.findOne(callback);
}

