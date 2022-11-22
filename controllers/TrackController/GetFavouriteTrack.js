import { Song, validate } from "#models/SongModel/song";
import asyncHandler from "#middlewares/asyncHandler";
import {User} from "#models/UserModel/user"
import {Artist } from "#models/ArtistModel/artist"
import mongoose from "mongoose";

//@desc  All track Get
//@route  /Alltrack
//@request Get Request
//@acess  public

export const getFavouriteTracks = asyncHandler(async (req, res) => {
  
  
  if(req.query.artistId && req.query.artistId != "undefined")
  {
    if (!mongoose.Types.ObjectId.isValid(req.query.artistId))
    {
    return res.status(400).send( {status : false , message : 'Invalid artist ID.'}); 
    } 
  }
  if(req.query.userId && req.query.userId != "undefined")
  {
  if (!mongoose.Types.ObjectId.isValid(req.query.userId))
  {
  return res.status(400).send( {status : false , message : 'Invalid user ID.'}); 
  }
}
console.log(req.query);

  let user = await User.findOne({_id : req.query?.userId });
  let artist = await Artist.findOne({_id : req.query?.artistId });
  if(!user && req.query.userId != "undefined") 
  {
    return res.status(200).json({ status: true, message: "User record not found" });
  }
  if(!artist && req.query.artistId != "undefined") 
  {
    return res.status(200).json({ status: true, message: "Artist record not found" });
  }
  let songs ;
  if(user)
  {
   songs = await Song.find({_id : {$in : user?.trackId} , isSuspend : false});
  }
  else if(artist)
  {
    songs = await Song.find({_id : {$in : artist?.trackId} , isSuspend : false});
  }
  if (songs?.length > 0) {
    return res.status(200).json(songs);
  } else {
    return res.status(200).json({ status: true, message: "No record found" });
  }
});
