import asyncHandler from "#middlewares/asyncHandler";
import { Shares } from "#models/SharesModel/shares"
import { User } from "#models/UserModel/user";
import {Song , validate} from "#models/SongModel/song"

///@desc  Track Shares Create
//@route  /trackShares
//@request Post Request
//@acess  public

export const trackShares = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res
      .status(404)
      .json({ status: false, message: "User record not found" });
  }
  const track = await Song.findById(req.body.trackId);

  if (!track) {
    return res
      .status(404)
      .json({ status: false, message: "track record not found" });
  }

  const sharesValid = await Shares.findOne({ userId: req.params.id, trackId: req.body.trackId });

    if (!sharesValid) {
        let shares = new Shares({ userId: req.params.id, trackId: req.body.trackId })
        await shares.save();
        await Song.findByIdAndUpdate(req.body.trackId, {
          totalShares: track.totalShares + 1,
        });
        return res.status(201).json({ status: true, message: "Track Shares created successfully" })
    }
    else {
        return res.status(403).json({ status: false, message: "Track Shares sent Already" })
    }
});
