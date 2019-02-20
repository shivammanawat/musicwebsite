//loading package
const express = require("express");
const router = express.Router();
const passport = require('passport');

//profile
router.get('/profile',(req, res,next) => {
    res.json({user:req.user});
});


//===========  all track ===========

//creating track const to access the track model
const Track = require('../model/tracks');

//gettting all track
router.get('/alltrack', function(req, res){
    Track.getTracks(function(err, tracks){
         if(err)
         return res.json({success: false, msg: 'Problem'});
         res.json(tracks);
     });
   });

//add track 
router.post('/alltrack', function(req, res)
{
    var trackid=req.body.trackid;
    var trackname=req.body.trackname;
    var trackurl=req.body.trackurl;
    var user = {
        id: req.user._id,
        username: req.user.username
    }
    var newTrack = {trackid: trackid,   trackname: trackname,   trackurl:   trackurl,user: user}
    Track.addTrack(newTrack,function(err,track){
         if(err) 
         res.json({success:false,msg:"duplicate"});
         else
         res.json({success:true,track});
     });
   });

   //update track
  router.put('/alltrack/:_id', function(req, res){
    var update = 
    {
        trackid:req.body.trackid,
        trackname:req.body.trackname,
        trackurl:req.body.trackurl
    }
    Track.updateTrack(req.params._id,update,function(err,track){
         if(err) 
         return res.json({success: false, msg: 'Cannot update'});
         else
         res.json({success: true,track});
     });
   });

//delete track
router.delete('/alltrack/:_id', function(req, res){
  Track.deleteTrack(req.params._id,function(err,track){
       if(err) 
       return res.json({success: false, msg: 'Cannot Delete Track'});
       else
       res.json(track);
   });
 });

 //show one track info
 router.get('/alltrack/:_id', function(req, res){
    Track.getTrack(req.params._id,function(err,track){
       if(err) 
       {
        return res.json({success: false, msg: 'Not able to get Info'});
       }
       else
       res.json(track);
   });
 });

//exporting router module
module.exports = router;