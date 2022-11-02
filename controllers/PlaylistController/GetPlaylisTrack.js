import {Playlist , validate} from "#models/PlayListModel/playlist"
import asyncHandler from "#middlewares/asyncHandler";
import { Song } from "#models/SongModel/song";

//@desc  Get Playlist Track
//@route  /playlistTrack
//@request Get Request
//@acess  public

export const getPlaylistTrack = asyncHandler(async (req, res) => {

  const playlistsTrack = await Song.find({_id : { $in : req.query.trackId}}).select("-__v");

  if (playlistsTrack) {
    return res.status(200).json(playlistsTrack);
  }
  else {
    res.status(404).json({ status: false, message: "No record found" });
  }
});
