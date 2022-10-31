import {AlbumTrack , validate} from "#models/AlbumTrackModel/albumTrack"
import asyncHandler from "#middlewares/asyncHandler";

//@desc  Get One Album Track
//@route  /albumTrack/id
//@request Get Request
//@acess  public

export const getOneAlbumTrack = asyncHandler(async (req, res) => {

  const albumsTrack = await AlbumTrack.findById(req.params.id).select("-__v");

  if (albumsTrack) {
    return res.status(200).json(albumsTrack);
  }
  else {
    res.status(404).json({ status: false, message: "No record found" });
  }
});
