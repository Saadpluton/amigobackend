import asyncHandler from "#middlewares/asyncHandler";
import { Shares } from "#models/SharesModel/shares"
import { User } from "#models/UserModel/user";
import {Album} from "#models/AlbumModel/album"
import { Artist } from "#models/ArtistModel/artist"

///@desc  Artsit Shares Create
//@route  /AlbumShares
//@request Post Request
//@acess  public

export const albumShares = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const artist = await Artist.findById(req.params.id);
  const album = await Album.findById(req.body.albumId);
  if (!album) {
    return res
      .status(200)
      .json({ status: true, message: "Album record not found" });
  }
if(artist || user)
{
  const sharesValid = await Shares.findOne({ userId: req.params.id, albumId: req.body.albumId });

    if (!sharesValid) {
        let shares = new Shares({ userId: req.params.id, albumId: req.body.albumId })
        await shares.save();
        await Album.findByIdAndUpdate(req.body.albumId, {
          totalShares: album.totalShares + 1,
        });
        return res.status(201).json({ status: true, message: "Album Shares created successfully" })
    }
    else {
        return res.status(200).json({ status: true, message: "Album Shares sent Already" })
    }
  }
  else{
    return res
    .status(200)
    .json({ status: true, message: "Record not found" });
  }
});
