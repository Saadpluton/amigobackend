import { Song, validate } from "#models/SongModel/song";
import asyncHandler from "#middlewares/asyncHandler";

//@desc  Get One Track
//@route  /track/id
//@request Get Request
//@acess  public

export const getOneTrack = asyncHandler(async (req, res) => {
  const songs = await Song.findById(req.params.id).select("-__v");

  if (songs) {
    return res.status(200).json(songs);
  } else {
    res.status(404).json({ status: true, message: "No record found" });
  }
});
