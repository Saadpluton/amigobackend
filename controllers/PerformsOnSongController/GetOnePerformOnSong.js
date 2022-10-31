import {PerformOnSong , validate} from "#models/PerformOnSongModel/performsOnSong"
import asyncHandler from "#middlewares/asyncHandler";

//@desc  Get One PerformOnSong
//@route  /performOnSong/:id
//@request Get Request
//@acess  public

export const getOnePerformOnSong = asyncHandler(async (req, res) => {

  const performOnSong = await PerformOnSong.findById(req.params.id).select("-__v");

  if (performOnSong) {
    return res.status(200).json(performOnSong);
  }
  else {
    res.status(404).json({ status: false, message: "No record found" });
  }
});
