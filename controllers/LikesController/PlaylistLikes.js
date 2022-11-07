import asyncHandler from "#middlewares/asyncHandler";
import { Likes } from "#models/LikesModel/likes";
import { User } from "#models/UserModel/user";
import {Playlist , validate} from "#models/PlayListModel/playlist"
import mongoose from "mongoose";


//@desc  Likes Create And Remove
//@route  /Playlistlikes
//@request Post Request
//@acess  public

export const PlaylistLikes = asyncHandler(async (req, res) => {
  
  if (!mongoose.Types.ObjectId.isValid(req.body.playlistId))
  {
  return res.status(400).send( {status : false , message : 'Invalid playlist ID.'}); 
  }

  const user = await User.findById(req.params.id);
  if (!user) {
    return res
      .status(200)
      .json({ status: true, message: "User record not found" });
  }
  const playlist = await Playlist.findById(req.body.playlistId);

  if (!playlist) {
    return res
      .status(200)
      .json({ status: true, message: "Playlist record not found" });
  }
  const likesValid = await Likes.findOne({
    userId: req.params.id,
    playlistId: req.body.playlistId,
  });

  if (likesValid) {
    await Likes.findOneAndDelete({
      userId: req.params.id,
      playlistId: req.body.playlistId,
    });
    await Playlist.findByIdAndUpdate(req.body.playlistId, {
      totalLikes: playlist.totalLikes - 1,
    });
    return res
      .status(200)
      .json({ status: true, message: "likes remove successfully" });
  } else {
    let likes = new Likes({ userId: req.params.id, playlistId: req.body.playlistId });
    await likes.save();
    await Playlist.findByIdAndUpdate(req.body.playlistId, {
      totalLikes: playlist.totalLikes + 1,
    });
    return res
      .status(201)
      .json({ status: true, message: "Playlist likes created successfully" });
  }
});
