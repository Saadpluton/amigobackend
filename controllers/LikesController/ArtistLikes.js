import asyncHandler from "#middlewares/asyncHandler";
import { Likes } from "#models/LikesModel/likes";
import { User } from "#models/UserModel/user";
import {Artist , validate} from "#models/ArtistModel/artist"

//@desc  Likes Create And Remove
//@route  /artistlikes
//@request Post Request
//@acess  public

export const artistLikes = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res
      .status(404)
      .json({ status: false, message: "User record not found" });
  }
  const artist = await Artist.findById(req.body.artistId);

  if (!artist) {
    return res
      .status(404)
      .json({ status: false, message: "Artist record not found" });
  }
  const likesValid = await Likes.findOne({
    userId: req.params.id,
    artistId: req.body.artistId,
  });

  if (likesValid) {
    await Likes.findOneAndDelete({
      userId: req.params.id,
      artistId: req.body.artistId,
    });
    await Artist.findByIdAndUpdate(req.body.artistId, {
      totalLikes: artist.totalLikes - 1,
    });
    return res
      .status(200)
      .json({ status: false, message: " Artist likes remove successfully" });
  } else {
    let likes = new Likes({ userId: req.params.id, artistId: req.body.artistId });
    await likes.save();
    await Artist.findByIdAndUpdate(req.body.artistId, {
      totalLikes: artist.totalLikes + 1,
    });
    return res
      .status(201)
      .json({ status: true, message: "Artist likes created successfully" });
  }
});
