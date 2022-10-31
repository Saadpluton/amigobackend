import { Song, validate } from "#models/SongModel/song";
import asyncHandler from "#middlewares/asyncHandler";

//@desc  track Get
//@route  /track
//@request Get Request
//@acess  public

export const getTracks = asyncHandler(async (req, res) => {
  const songs = await Song.find().select("-__v");

  if (songs.length > 0) {
    res.status(200).json(songs);
  } else {
    res.status(404).json({ status: false, message: "No record found" });
  }
});
