import asyncHandler from "#middlewares/asyncHandler";
import { Likes } from "#models/LikesModel/likes";
import { User } from "#models/UserModel/user";
import mongoose from "mongoose";
import { ArtistComments } from "#models/CommentsModel/artist_comments";
import {Artist} from "#models/ArtistModel/artist"

//@desc  Likes Create And Remove
//@route  /artistlikes
//@request Post Request
//@acess  public

export const artistCommentsLikes = asyncHandler(async (req, res) => {
  
  if (!mongoose.Types.ObjectId.isValid(req.body.artistCommentId))
  {
  return res.status(400).send( {status : false , message : 'Invalid artist Comment ID.'}); 
  }

  const user = await User.findById(req.params.id);
  const artistFind = await Artist.findById(req.params.id);
  const artist = await ArtistComments.findById(req.body.artistCommentId);
  
  if (!artist) {
    return res
      .status(200)
      .json({ status: true, message: "Artist Comments record not found" });
  }

if(artistFind || user)
{
  const likesValid = await Likes.findOne({
    userId: req.params.id,
    artistCommentId: req.body.artistCommentId,
  });

  if (likesValid) {
    await Likes.findOneAndDelete({
      userId: req.params.id,
      artistCommentId: req.body.artistCommentId,
    });
    if(artist.totalLikes !== 0){
    await ArtistComments.findByIdAndUpdate(req.body.artistCommentId, {
      totalLikes: artist.totalLikes - 1,
    });
  }
    return res
      .status(200)
      .json({ status: true, message: " Artist Comments likes remove successfully" });
  } else {
    let likes = new Likes({ userId: req.params.id, artistCommentId: req.body.artistCommentId });
    await likes.save();
    await ArtistComments.findByIdAndUpdate(req.body.artistCommentId, {
      totalLikes: artist.totalLikes + 1,
    });
    return res
      .status(201)
      .json({ status: true, message: "Artist Comments likes created successfully" });
  }
}
else{
  return res
      .status(200)
      .json({ status: true, message: "Record not found" });
}
});
