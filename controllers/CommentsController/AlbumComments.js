import asyncHandler from "#middlewares/asyncHandler";
import { User } from "#models/UserModel/user";
import { Song } from "#models/SongModel/song";
import { AlbumComments } from "#models/CommentsModel/album_comments";
import mongoose from "mongoose";
import {Album } from "#models/AlbumModel/album"

//@desc  albumComments Create And Remove
//@route  /albumComments
//@request Post Request
//@acess  public

export const albumComments = asyncHandler(async (req, res) => {

  if (!mongoose.Types.ObjectId.isValid(req.body.userId))
  {
  return res.status(400).send( {status : false , message : 'Invalid user ID.'}); 
  }
  if (!mongoose.Types.ObjectId.isValid(req.body.albumId))
  {
  return res.status(400).send( {status : false , message : 'Invalid album ID.'}); 
  } 
  if(req.body.parentId)
  {
    if (!mongoose.Types.ObjectId.isValid(req.body.parentId))
    {
    return res.status(400).send( {status : false , message : 'Invalid parent ID.'}); 
    }
  }
  
  const user = await User.findById(req.body.userId);
  if (!user) {
    return res
      .status(200)
      .json({ status: true, message: "User record not found" });
  }
  const album = await Album.findById(req.body.albumId);

  if (!album) {
    return res
      .status(200)
      .json({ status: true, message: "album record not found" });
  }
  
  if (req.body.parentId !== "") {
    const CommentsParentValid = await AlbumComments.findById(req.body.parentId);

    if (!CommentsParentValid) {
      return res
        .status(200)
        .json({ status: true, message: "album parent record not found" });

    }
  }

  const parentId = req.body.parentId && req.parentId != "" ? req.body.parentId : undefined

  let comments = new AlbumComments({ userId: req.body.userId, albumId: req.body.albumId, comments: req.body.comments, parentId });
  await comments.save();
  await Album.findByIdAndUpdate(req.body.albumId, {
    totalComments: album.totalComments + 1,
  });
  return res
    .status(201)
    .json({ status: true, message: "Album comments created successfully" });

});
