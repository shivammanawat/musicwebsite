//loading package
const mongoose = require('mongoose');
const TrackSchema = new mongoose.Schema({
    trackid:
    { 
        type:Number,
        unique:true,
        required:true
    },
    trackname:
    {
        type:String,
        required:true
    },
    trackurl:
    {
        type:String,
        required:true
    },
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
             },
            username: 
            {
                type:String
            }
        }
})

//creating Track model
const Track = module.exports = mongoose.model('Track', TrackSchema);

//get all tracks
module.exports.getTracks = function(callback){
    Track.find(callback);
}

//add track
module.exports.addTrack= function(newTrack, callback){
    Track.create(newTrack, callback);
}

//update track
module.exports.updateTrack = function(id, newTrack, callback){
    Track.findByIdAndUpdate(id, newTrack, callback);
}

// delete track
module.exports.deleteTrack = function(id, callback){
    Track.findByIdAndRemove(id, callback);
}

// get info of one track
module.exports.getTrack = function(id, callback){
    Track.findById(id, callback);
}
