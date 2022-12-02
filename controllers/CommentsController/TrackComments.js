import asyncHandler from "#middlewares/asyncHandler";
import { TrackComments } from "#models/CommentsModel/track_comments";
import { User } from "#models/UserModel/user";
import { Song } from "#models/SongModel/song";
import { Artist } from "#models/ArtistModel/artist"
import mongoose from "mongoose";

//@desc  Comments Create And Remove
//@route  /Comments
//@request Post Request
//@acess  public

export const trackComments = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.body.userId))
  {
  return res.status(400).send( {status : false , message : 'Invalid user ID.'}); 
  }
  if (!mongoose.Types.ObjectId.isValid(req.body.trackId))
  {
  return res.status(400).send( {status : false , message : 'Invalid track ID.'}); 
  } 
  if(req.body.parentId)
  {
    if (!mongoose.Types.ObjectId.isValid(req.body.parentId))
    {
    return res.status(400).send( {status : false , message : 'Invalid parent ID.'}); 
    }
  }
  const user = await User.findById(req.body.userId);
  const artist = await Artist.findById(req.body.userId);
  const song = await Song.findById(req.body.trackId);

  if (!song) {
    return res
      .status(200)
      .json({ status: true, message: "Track record not found" });
  }
  if (req.body.parentId !== "") 
  {
    const CommentsParentValid = await TrackComments.findById(req.body.parentId);

    if(!CommentsParentValid && req.body.parentId)
    {
   return res
        .status(200)
        .json({ status: true, message: "Track parent record not found" });
   
    }
  }

  if(user || artist)
  {
    let image = user ? {image : user?.image} : {image : artist?.image}
    let name = user ? {name : user?.name} : {name : artist?.name}
    
  const parentId = req.body.parentId && req.parentId != "" ? req.body.parentId : undefined

  let comments = new TrackComments({ userId: req.body.userId, trackId: req.body.trackId , comments : req.body.comments,...image,...name , parentId });
    await comments.save();
    await Song.findByIdAndUpdate(req.body.trackId, {
      totalComments: song.totalComments + 1,
    });
    return res
      .status(201)
      .json({ status: true, message: "Track Comments created successfully" });
  }
  else{
    return res
    .status(200)
    .json({ status: true, message: "Record not found" });
  }
});
