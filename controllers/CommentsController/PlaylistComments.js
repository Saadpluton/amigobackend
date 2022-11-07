import asyncHandler from "#middlewares/asyncHandler";
import { PlaylistComments } from "#models/CommentsModel/playlist_comments";
import { User } from "#models/UserModel/user";
import {Playlist , validate} from "#models/PlayListModel/playlist"

//@desc  Comments Create And Remove
//@route  /Comments
//@request Post Request
//@acess  public

export const playlistComments = asyncHandler(async (req, res) => {

  const user = await User.findById(req.body.userId);
  if (!user) {
    return res
      .status(200)
      .json({ status: true, message: "User record not found" });
  }
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

  const parentId = req.body.parentId && req.parentId != "" ? req.body.parentId : undefined

  let comments = new PlaylistComments({ userId: req.body.userId, playlistId: req.body.playlistId , comments : req.body.comments , parentId });
    await comments.save();
    await Playlist.findByIdAndUpdate(req.body.playlistId, {
      totalComments: playlist.totalComments + 1,
    });
    return res
      .status(201)
      .json({ status: true, message: "Playlist comments created successfully" });
  
});
