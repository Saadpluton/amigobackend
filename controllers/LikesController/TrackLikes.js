import asyncHandler from "#middlewares/asyncHandler";
import { Likes } from "#models/LikesModel/likes";
import { User } from "#models/UserModel/user";
import { Song } from "#models/SongModel/song";

//@desc  Likes Create And Remove
//@route  /likes
//@request Post Request
//@acess  public

export const trackLikes = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res
      .status(404)
      .json({ status: false, message: "User record not found" });
  }
  const song = await Song.findById(req.body.songId);

  if (!song) {
    return res
      .status(404)
      .json({ status: false, message: "Song record not found" });
  }
  const likesValid = await Likes.findOne({
    userId: req.params.id,
    songId: req.body.songId,
  });

  if (likesValid) {
    await Likes.findOneAndDelete({
      userId: req.params.id,
      songId: req.body.songId,
    });
    await Song.findByIdAndUpdate(req.body.songId, {
      totalLikes: song.totalLikes - 1,
    });
    return res
      .status(200)
      .json({ status: false, message: "likes remove successfully" });
  } else {
    let likes = new Likes({ userId: req.params.id, songId: req.body.songId });
    await likes.save();
    await Song.findByIdAndUpdate(req.body.songId, {
      totalLikes: song.totalLikes + 1,
    });
    return res
      .status(201)
      .json({ status: true, message: "Track likes created successfully" });
  }
});
