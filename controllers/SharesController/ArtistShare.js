import asyncHandler from "#middlewares/asyncHandler";
import { Shares } from "#models/SharesModel/shares"
import { User } from "#models/UserModel/user";
import { Artist, validate } from "#models/ArtistModel/artist"

///@desc  Artsit Shares Create
//@route  /artistShares
//@request Post Request
//@acess  public

export const artistShares = asyncHandler(async (req, res) => {
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

  const sharesValid = await Shares.findOne({ userId: req.params.id, artistId: req.body.artistId });

  if (!sharesValid) {
    let shares = new Shares({ userId: req.params.id, artistId: req.body.artistId })
    await shares.save();
    await Artist.findByIdAndUpdate(req.body.artistId, {
      totalShares: artist.totalShares + 1,
    });
    return res.status(201).json({ status: true, message: "Artist Shares created successfully" })
  }
  else {
    return res.status(403).json({ status: false, message: "Artist Shares sent Already" })
  }
});
