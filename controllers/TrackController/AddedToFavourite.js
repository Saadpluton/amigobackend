import _ from "lodash";
import asyncHandler from "#middlewares/asyncHandler";
import {User} from "#models/UserModel/user"
import { Song } from "#models/SongModel/song";
import {Artist } from "#models/ArtistModel/artist"
import mongoose from "mongoose";

//@desc  Add track in Playlist
//@route  /addtrackplaylist
//@request Post Request
//@acess  public

export const addTrackFavourite = asyncHandler(async (req, res) => {

  if(req.body.artistId)
  {
    if (!mongoose.Types.ObjectId.isValid(req.body.artistId))
    {
    return res.status(400).send( {status : false , message : 'Invalid artist ID.'}); 
    } 
  }
  if(req.body.userId)
  {
  if (!mongoose.Types.ObjectId.isValid(req.body.userId))
  {
  return res.status(400).send( {status : false , message : 'Invalid user ID.'}); 
  }
}
  if (!mongoose.Types.ObjectId.isValid(req.body.trackId))
  {
  return res.status(400).send( {status : false , message : 'Invalid trackId ID.'}); 
  } 


    const user= await User.findById(req.body?.userId);
    const track= await Song.findById(req.body?.trackId);   
    const artist = await Artist.findById(req.body?.artistId);   

 let users ;
    if(req.body.userId )
    {
        users = await User.findOne({_id : req.body?.userId ,trackId : { $in : req.body?.trackId}});
    }
    else if(req.body.artistId )
    {
        users = await Artist.findOne({_id : req.body?.artistId , trackId : { $in : req.body?.trackId}} );
    }
if (users) {
  return res.status(200).json({ status: true, message: "Track favourite added already" })
}


    if (!artist && req.body.artistId) {
      return res.status(200).json({ status: true, message: "Artist record not found" })
    }

    if (!user && req.body.userId) {
      return res.status(200).json({ status: true, message: "User record not found" })
    }
    if (!track) {
      return res.status(200).json({ status: true, message: "Track record not found" })
    }
  

    if(user)
    {
        const update = await User.findOneAndUpdate({_id : req.body?.userId },{$push : {trackId : req.body?.trackId}  })
        return res.status(200).json({ status: true, message: "Track added in favourite successfully" })
    }
    if(artist)
    {
    const update = await Artist.findOneAndUpdate({_id : req.body?.artistId },{$push : {trackId : req.body?.trackId}  })
    return res.status(200).json({ status: true, message: "Track added in favourite successfully" })
}
  })

  