import { Playlist, validate } from "#models/PlayListModel/playlist"
import asyncHandler from "#middlewares/asyncHandler";
import { Listener } from "#models/ListenerModel/listener";
import { Likes } from "#models/LikesModel/likes";
import { Album } from "#models/AlbumModel/album";

//@desc  Playlist Get
//@route  /playList
//@request Get Request
//@acess  public

export const getArtistAlbum = asyncHandler(async (req, res) => {

  let albums = await Album.find({artistId: req.query.artistId , isSuspend: false})

  if (albums.length > 0) {
    return res.status(200).json({
      status: true,
      album : albums,
    })}
  else {
    return res.status(200).json({ status: true, message: "No album record found" ,album : albums});
  }
});
