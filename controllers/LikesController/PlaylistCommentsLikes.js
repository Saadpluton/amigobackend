import asyncHandler from "#middlewares/asyncHandler";
import { Likes } from "#models/LikesModel/likes";
import { User } from "#models/UserModel/user";
import mongoose from "mongoose";
import { PlaylistComments } from "#models/CommentsModel/playlist_comments";

//@desc  Likes Create And Remove
//@route  /playlistlikes
//@request Post Request
//@acess  public

export const playlistCommentsLikes = asyncHandler(async (req, res) => {
  
  if (!mongoose.Types.ObjectId.isValid(req.body.playlistCommentId))
  {
  return res.status(400).send( {status : false , message : 'Invalid playlist Comment ID.'}); 
  }

  const user = await User.findById(req.params.id);
  if (!user) {
    return res
      .status(200)
      .json({ status: true, message: "User record not found" });
  }
  const playlist = await PlaylistComments.findById(req.body.playlistCommentId);

  if (!playlist) {
    return res
      .status(200)
      .json({ status: true, message: "playlist Comments record not found" });
  }
  const likesValid = await Likes.findOne({
    userId: req.params.id,
    playlistCommentId: req.body.playlistCommentId,
  });

  if (likesValid) {
    await Likes.findOneAndDelete({
      userId: req.params.id,
      playlistCommentId: req.body.playlistCommentId,
    });
    await PlaylistComments.findByIdAndUpdate(req.body.playlistCommentId, {
      totalLikes: playlist.totalLikes - 1,
    });
    return res
      .status(200)
      .json({ status: true, message: " Playlist Comments likes remove successfully" });
  } else {
    let likes = new Likes({ userId: req.params.id, playlistCommentId: req.body.playlistCommentId });
    await likes.save();
    await PlaylistComments.findByIdAndUpdate(req.body.playlistCommentId, {
      totalLikes: playlist.totalLikes + 1,
    });
    return res
      .status(201)
      .json({ status: true, message: "Playlist Comments likes created successfully" });
  }
});
