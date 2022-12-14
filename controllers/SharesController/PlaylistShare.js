import asyncHandler from "#middlewares/asyncHandler";
import { Shares } from "#models/SharesModel/shares"
import { User } from "#models/UserModel/user";
import { Playlist } from "#models/PlayListModel/playlist"
import { Artist } from "#models/ArtistModel/artist"

///@desc  Track Shares Create
//@route  /trackShares
//@request Post Request
//@acess  public

export const playlistShares = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const artist = await Artist.findById(req.params.id);
  const playlist = await Playlist.findById(req.body.playlistId);

  if (!playlist) {
    return res
      .status(200)
      .json({ status: true, message: "playlist record not found" });
  }
  if (user || artist) {
    const sharesValid = await Shares.findOne({ userId: req.params.id, playlistId: req.body.playlistId });

    if (!sharesValid) {
      let shares = new Shares({ userId: req.params.id, playlistId: req.body.playlistId })
      await shares.save();
      await Playlist.findByIdAndUpdate(req.body.playlistId, {
        totalShares: playlist.totalShares + 1,
      });
      return res.status(201).json({ status: true, message: "Playlist Shares created successfully" })
    }
    else {
      return res.status(200).json({ status: true, message: "Playlist Shares sent Already" })
    }
  }
  else {
    return res
      .status(200)
      .json({ status: true, message: "Record not found" });
  }

});
