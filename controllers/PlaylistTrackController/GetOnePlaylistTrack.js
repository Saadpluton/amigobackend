import {PlaylistTrack , validate} from "#models/PlayListTrackModel/playlistTrack"
import asyncHandler from "#middlewares/asyncHandler";

//@desc  Get One PlaylistTrack 
//@route  /playlistTrack/id
//@request Get Request
//@acess  public

export const getOnePlaylistTrack = asyncHandler(async (req, res) => {

  const playlistTracks = await PlaylistTrack.findById(req.params.id).select("-__v");

  if (playlistTracks) {
    return res.status(200).json(playlistTracks);
  }
  else {
    res.status(404).json({ status: false, message: "No record found" });
  }
});
