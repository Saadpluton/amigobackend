import {Playlist , validate} from "#models/PlayListModel/playlist"
import asyncHandler from "#middlewares/asyncHandler";

//@desc  Get One Playlist 
//@route  /playlist/id
//@request Get Request
//@acess  public

export const getOnePlaylist = asyncHandler(async (req, res) => {

  const playlists = await Playlist.findById(req.params.id).select("-__v");

  if (playlists) {
    return res.status(200).json(playlists);
  }
  else {
    res.status(404).json({ status: false, message: "No record found" });
  }
});
