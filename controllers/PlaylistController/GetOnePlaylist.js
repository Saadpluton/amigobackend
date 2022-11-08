import { Playlist, validate } from "#models/PlayListModel/playlist"
import asyncHandler from "#middlewares/asyncHandler";
import { Listener } from "#models/ListenerModel/listener";
import { PlaylistComments } from "#models/CommentsModel/playlist_comments";
import { Artist } from "#models/ArtistModel/artist";
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

  if (listener?.length > 0)
    listener?.map((x) => {
      if (playlists?._id.equals(x?.playlistId)) {
        playlists.isViewed = true
      }
    })

    const similarPlaylist = await Playlist.find({ _id : { $ne  : req.params.id}}).limit(20).select('-__v');
  
    const similarArtist = await Artist.find( { _id : { $ne  : req.params.id}}).limit(20).select('-__v');
  
    const playlistComments  = await PlaylistComments.aggregate([
      { "$lookup": {
        "from": "playlistcomments",
        "localField": "_id",
        "foreignField": "parentId",
        "as": "child"
      }},
    ])
  

    if (playlists) {
    return res.status(200).json({playlists : playlists , similarPlaylist : similarPlaylist , similarArtist : similarArtist , playlistComments : playlistComments});
  }
  else {
    return res.status(200).json({ status: true, message: "No record found" });
  }
});
