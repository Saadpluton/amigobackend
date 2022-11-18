import { Song, validate } from "#models/SongModel/song";
import asyncHandler from "#middlewares/asyncHandler";

//@desc  All track Get Artist
//@route  /Alltrack
//@request Get Request
//@acess  public

export const getAllArtistTracks = asyncHandler(async (req, res) => {

  let songs = await Song.find({artistId : req.params?.id ,isSuspend : false});

  if (songs?.length > 0) {
    return res.status(200).json(songs);
  } else {
    return res.status(200).json({ status: true, message: "No record found" });
  }
});
