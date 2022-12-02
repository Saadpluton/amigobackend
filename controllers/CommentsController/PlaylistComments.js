import asyncHandler from "#middlewares/asyncHandler";
import { PlaylistComments } from "#models/CommentsModel/playlist_comments";
import { User } from "#models/UserModel/user";
import {Playlist} from "#models/PlayListModel/playlist"
import { Artist } from "#models/ArtistModel/artist"
import mongoose from "mongoose";

//@desc  Comments Create And Remove
//@route  /Comments
//@request Post Request
//@acess  public

export const playlistComments = asyncHandler(async (req, res) => {

  if (!mongoose.Types.ObjectId.isValid(req.body.userId))
  {
  return res.status(400).send( {status : false , message : 'Invalid user ID.'}); 
  }
  if (!mongoose.Types.ObjectId.isValid(req.body.playlistId))
  {
  return res.status(400).send( {status : false , message : 'Invalid playlist ID.'}); 
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
  const playlist = await Playlist.findById(req.body.playlistId);

  if (!playlist) {
    return res
      .status(200)
      .json({ status: true, message: "playlist record not found" });
  }

  if (req.body.parentId !== "") 
  {
    const CommentsParentValid = await PlaylistComments.findById(req.body.parentId);

    if(!CommentsParentValid && req.body.parentId)
    {
   return res
        .status(200)
        .json({ status: true, message: "Playlist parent record not found" });
   
    }
  }
if(user || artist)
{
  let image = user ? {image : user?.image} : {image : artist?.image}
  let name = user ? {name : user?.name} : {name : artist?.name}
  
  const parentId = req.body.parentId && req.parentId != "" ? req.body.parentId : undefined

  let comments = new PlaylistComments({ userId: req.body.userId, playlistId: req.body.playlistId , comments : req.body.comments,...image,...name , parentId });
    await comments.save();
    await Playlist.findByIdAndUpdate(req.body.playlistId, {
      totalComments: playlist.totalComments + 1,
    });
    return res
      .status(201)
      .json({ status: true, message: "Playlist comments created successfully" });
}
else{
  return res
  .status(200)
  .json({ status: true, message: "Record not found" });
}
});
