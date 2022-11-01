import { Playlist, validate } from "#models/PlayListModel/playlist"
import asyncHandler from "#middlewares/asyncHandler";

//@desc  Playlist Get
//@route  /playList
//@request Get Request
//@acess  public

export const getPlaylists = asyncHandler(async (req, res) => {
  
  const query = req.query.genre && req.query.subGenre ? {trackGenre: req.query.genre, trackSubGenre: req.query.subGenre} : {}

  const playLists = await Playlist.find(query).select('-__v');

  if (playLists.length > 0) {
    return res.status(200).json(playLists);
  }
  else {
    return res.status(404).json({ status: false, message: "No playlist record found" });
  }
});
