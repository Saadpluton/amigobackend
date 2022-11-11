import { Playlist, validate } from "#models/PlayListModel/playlist"
import asyncHandler from "#middlewares/asyncHandler";
import { Listener } from "#models/ListenerModel/listener";
import { Likes } from "#models/LikesModel/likes";

//@desc  Playlist Get
//@route  /playList
//@request Get Request
//@acess  public

export const getPlaylists = asyncHandler(async (req, res) => {

  const playLists = await Playlist.find();
  
  if (playLists.length > 0) {
    return res.status(200).json({
      status: true,
      playLists,
    })}
  else {
    return res.status(200).json({ status: true, message: "No playlist record found" });
  }
});
