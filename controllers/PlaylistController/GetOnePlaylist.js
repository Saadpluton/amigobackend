import {Playlist , validate} from "#models/PlayListModel/playlist"
import asyncHandler from "#middlewares/asyncHandler";

//@desc  Get One Playlist 
//@route  /playlist/id
//@request Get Request
//@acess  public

export const getOnePlaylist = asyncHandler(async (req, res) => {

  const playlists = await Playlist.findById(req.params.id);

  if (playlists) {
    return res.status(200).json(playlists);
  }
  else {
    return res.status(200).json({ status: true, message: "No record found" });
  }
});
