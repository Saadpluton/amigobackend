import asyncHandler from "#middlewares/asyncHandler";
import { Likes } from "#models/LikesModel/likes";
import { User } from "#models/UserModel/user";
import { Album } from "#models/AlbumModel/album";
import mongoose from "mongoose";


//@desc  Likes Create And Remove
//@route  /albumlikes
//@request Post Request
//@acess  public

export const albumLikes = asyncHandler(async (req, res) => {
  
  if (!mongoose.Types.ObjectId.isValid(req.body.albumId))
  {
  return res.status(404).send( {status : false , message : 'Invalid album ID.'}); 
  }
  
  const user = await User.findById(req.params.id);
  
  if (!user) {
    return res
      .status(404)
      .json({ status: false, message: "User record not found" });
  }
  const album = await Album.findById(req.body.albumId);

  if (!album) {
    return res
      .status(404)
      .json({ status: false, message: "Album record not found" });
  }
  const likesValid = await Likes.findOne({
    userId: req.params.id,
    albumId: req.body.albumId,
  });

  if (likesValid) {
    await Likes.findOneAndDelete({
      userId: req.params.id,
      AlbumId: req.body.AlbumId,
    });
    await Album.findByIdAndUpdate(req.body.albumId, {
      totalLikes: album.totalLikes - 1,
    });
    return res
      .status(200)
      .json({ status: false, message: "likes remove successfully" });
  } else {
    let likes = new Likes({ userId: req.params.id, albumId: req.body.albumId });
    await likes.save();
    await Album.findByIdAndUpdate(req.body.albumId, {
      totalLikes: album.totalLikes + 1,
    });
    return res
      .status(201)
      .json({ status: true, message: "Album likes created successfully" });
  }
});
