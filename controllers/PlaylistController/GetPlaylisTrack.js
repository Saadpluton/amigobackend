import {Playlist , validate} from "#models/PlayListModel/playlist"
import asyncHandler from "#middlewares/asyncHandler";
import { Song } from "#models/SongModel/song";

//@desc  Get Playlist Track
//@route  /playlistTrack
//@request Get Request
//@acess  public

export const getPlaylistTrack = asyncHandler(async (req, res) => {

  let ids ;
  ids = req.query.trackId.split(',')
  console.log(ids)

  const playlistsTrack = await Song.find({_id : { $in : ids}}).select("-__v");

  if (playlistsTrack.length > 0) {
    return res.status(200).json(playlistsTrack);
  }
  else {
    res.status(404).json({ status: false, message: "No record found" });
  }
});
