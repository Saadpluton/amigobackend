import { Song } from "#models/SongModel/song";
import asyncHandler from "#middlewares/asyncHandler";

//@desc  Suspend track
//@route  /track/suspend/:id
//@request Put Request
//@acess  public

export const suspendTrack = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const song = await Song.findById(id);

  if (song) {
    if (song.isSuspend === false) {
      const Suspend = await Song.findOneAndUpdate(
        { _id: id },
        { isSuspend: (song.isSuspend = true) },
        { new: true }
      );
      res
        .status(200)
        .json({ status: true, message: "Track has been enabled." });
    } else {
      const UnSuspend = await Song.findOneAndUpdate(
        { _id: id },
        { isSuspend: (song.isSuspend = false) },
        { new: true }
      );
     return res
        .status(200)
        .json({ status: true, message: "Track has been disabled." });
    }
  } else {
    res.status(200).json({ status: true, message: "No track found." });
  }
});
