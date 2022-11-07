import asyncHandler from "#middlewares/asyncHandler";
import { User } from "#models/UserModel/user";
import { Song } from "#models/SongModel/song";
import { ArtistComments } from "#models/CommentsModel/artist_comments";
import {Artist } from "#models/ArtistModel/artist"

//@desc  ArtistComments Create And Remove
//@route  /ArtistComments
//@request Post Request
//@acess  public

export const artistComments = asyncHandler(async (req, res) => {

  console.log(req.body);
  const user = await User.findById(req.body.userId);
  if (!user) {
    return res
      .status(200)
      .json({ status: true, message: "User record not found" });
  }
  const artist = await Artist.findById(req.body.artistId);

  if (!artist) {
    return res
      .status(200)
      .json({ status: true, message: "artist record not found" });
  }

  const CommentsParentValid = await ArtistComments.findById(req.body.parentId);

  if(!CommentsParentValid && req.body.parentId)
  {
 return res
      .status(200)
      .json({ status: true, message: "Artist parent record not found" });
 
  }
  const parentId =  req.body.parentId ? req.body.parentId : undefined

  let comments = new ArtistComments({ userId: req.body.userId, artistId: req.body.artistId , comments : req.body.comments , parentId });
    await comments.save();
    await Artist.findByIdAndUpdate(req.body.artistId, {
      totalComments: artist.totalComments + 1,
    });
    return res
      .status(201)
      .json({ status: true, message: "Artist comments created successfully" });
  
});
