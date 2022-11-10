import { Song, validate } from "#models/SongModel/song";
import asyncHandler from "#middlewares/asyncHandler";

//@desc  All track Get
//@route  /Alltrack
//@request Get Request
//@acess  public

export const getAllTracks = asyncHandler(async (req, res) => {


  let songs = await Song.find({});

  if (songs?.length > 0) {
    return res.status(200).json(songs);
  } else {
    return res.status(200).json({ status: true, message: "No record found" });
  }
});
