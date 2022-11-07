import { Playlist, validate } from "#models/PlayListModel/playlist"
import asyncHandler from "#middlewares/asyncHandler";
import { Listener } from "#models/ListenerModel/listener";

//@desc  Get One Playlist 
//@route  /playlist/id
//@request Get Request
//@acess  public

export const getOnePlaylist = asyncHandler(async (req, res) => {

  const ip = req.socket.remoteAddress.split(':').at(-1)
  const playlists = await Playlist.findById(req.params.id);

  if (!ip) {
    return res
      .status(200)
      .json({ status: true, message: "ip not found" });
  }


  const listener = await Listener.find({ userId: ip }).select('-__v');
  console.log(listener)
  if (listener?.length > 0)
    listener?.map((x) => {
      console.log("x", x?.playlistId)
      console.log("y", playlists?._id)

      if (playlists?._id.equals(x?.playlistId)) {
        playlists.isViewed = true
      }

    })
  if (playlists) {
    return res.status(200).json(playlists);
  }
  else {
    return res.status(200).json({ status: true, message: "No record found" });
  }
});
