import asyncHandler from "#middlewares/asyncHandler";
import { Likes } from "#models/LikesModel/likes";
import { User } from "#models/UserModel/user";
import { Song } from "#models/SongModel/song";
import {Artist} from "#models/ArtistModel/artist"
import mongoose from "mongoose";

//@desc  Likes Create And Remove
//@route  /likes
//@request Post Request
//@acess  public

export const trackLikes = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.body.trackId))
  {
  return res.status(400).send( {status : false , message : 'Invalid track ID.'}); 
  }

  const user = await User.findById(req.params.id);
  const artist = await Artist.findById(req.params.id);
  const song = await Song.findById(req.body.trackId);

  if (!song) {
    return res
      .status(200)
      .json({ status: true, message: "Track record not found" });
  }

  if(artist || user)
  {
   const likesValid = await Likes.findOne({
    userId: req.params.id,
    trackId: req.body.trackId,
  });
if(artist || user)
  if (likesValid) {
    await Likes.findOneAndDelete({
      userId: req.params.id,
      trackId: req.body.trackId,
    });
    if(song.totalLikes !== 0)
    {
    await Song.findByIdAndUpdate(req.body.trackId, {
      totalLikes: song.totalLikes - 1,
    });
  }
    return res
      .status(200)
      .json({ status: true, message: "likes remove successfully" });
  } else {
    let likes = new Likes({ userId: req.params.id, trackId: req.body.trackId });
    await likes.save();
    await Song.findByIdAndUpdate(req.body.trackId, {
      totalLikes: song.totalLikes + 1,
    });
    return res
      .status(201)
      .json({ status: true, message: "Track likes created successfully" });
  }
}
else{
  return res
      .status(200)
      .json({ status: true, message: "Record not found" });
}
});
