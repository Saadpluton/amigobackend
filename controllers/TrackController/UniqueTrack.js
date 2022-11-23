import { Song, validate } from "#models/SongModel/song";
import asyncHandler from "#middlewares/asyncHandler";

//@desc  All track Get Artist
//@route  /Alltrack
//@request Get Request
//@acess  public

export const getUniqueTrack = asyncHandler(async (req, res) => {

    let songs = await Song.find({ isTrending: false , isSuspend: false})
    .sort({ totalListeners: -1, totalLikes: -1 })
    .limit(1)
    

  if (songs?.length > 0) {
    return res.status(200).json(songs);
  } else {
    return res.status(200).json({ status: true, message: "No record found" });
  }
});
