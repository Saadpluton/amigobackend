import { Playlist, validate } from "#models/PlayListModel/playlist"
import asyncHandler from "#middlewares/asyncHandler";
import { Listener } from "#models/ListenerModel/listener";
import { PlaylistComments } from "#models/CommentsModel/playlist_comments";
import { Artist } from "#models/ArtistModel/artist";
import { Song } from "#models/SongModel/song";
import { Likes } from "#models/LikesModel/likes";

//@desc  Get One Playlist 
//@route  /playlist/id
//@request Get Request
//@acess  public

export const getOnePlaylist = asyncHandler(async (req, res) => {

  const ip = req.socket.remoteAddress.split(':').at(-1)
  const playlists = await Playlist.findById(req.params.id);

  let likes ;
  if(req?.query?.userId !== "undefined")
  {
   likes = await Likes.find( {userId :  req.query.userId}).select('-__v');
  }
  
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

    const playlistsTrack = await Song.find({ _id: { $in: playlists?.trackId } }).select("-__v");  
  
    const similarArtist = await Artist.find( { _id : { $ne  : req.params.id}}).limit(20).select('-__v');
  
    if (listener?.length > 0)
    listener?.map((x) => {
      playlistsTrack?.map((y) => {
         if (y?._id.equals(x?.trackId)) {
          y.isViewed = true
        }
      })
    })

    if (likes?.length > 0)
    likes?.map((x) => {
      playlistsTrack?.map((y) => {
           if (y?._id.equals(x?.trackId)) {
            y.isLiked = true
          }
        })
      })
    const playlistComments  = await PlaylistComments.aggregate([
      { "$lookup": {
        "from": "playlistcomments",
        "localField": "_id",
        "foreignField": "parentId",
        "as": "child"
      }},
    ])
  

    if (playlists) {
    return res.status(200).json({playlists : playlists ,playlistsTrack : playlistsTrack , similarPlaylist : similarPlaylist , similarArtist : similarArtist , playlistComments : playlistComments});
  }
  else {
    return res.status(200).json({ status: true, message: "No record found" });
  }
});
