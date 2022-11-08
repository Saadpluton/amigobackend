import { Artist } from "#models/ArtistModel/artist"
import asyncHandler from "#middlewares/asyncHandler";
import { Song, validate } from "#models/SongModel/song";
import { Playlist } from "#models/PlayListModel/playlist"
import { ArtistComments } from "#models/CommentsModel/artist_comments";
import { Album } from "#models/AlbumModel/album";
import { Likes } from "#models/LikesModel/likes";
import { Listener } from "#models/ListenerModel/listener";
import mongoose from "mongoose";

//@desc  Get One Artist 
//@route  /artist/id
//@request Get Request
//@acess  public

export const getOneArtist = asyncHandler(async (req, res) => {

  if (!mongoose.Types.ObjectId.isValid(req.params.id))
  {
  return res.status(400).send( {status : false , message : 'Invalid artist ID.'}); 
  }
  if(req.query.userId)
  {
    if (!mongoose.Types.ObjectId.isValid(req.query.userId))
    {
    return res.status(400).send( {status : false , message : 'Invalid user ID.'}); 
    }
  }
 
  const artist = await Artist.findById(req.params.id).select("-__v");

  const artistTrack = await Song.find({ artistId: req.params.id }).select("-__v");

  const artistPlaylist = await Playlist.find({ artistId: req.params.id }).select('-__v');

  const artistAlbum = await Album.find({ artistId: req.params.id }).select('-__v');

  const similarArtist = await Artist.find({ _id: { $ne: req.params.id } }).limit(20).select('-__v');

  let likes ;
  if(req?.query?.userId !== "undefined")
  {
   likes = await Likes.find( {userId :  req.query.userId}).select('-__v');
  }
  const ip = req.socket.remoteAddress.split(':').at(-1)
  
  if (!ip) {
    return res
      .status(200)
      .json({ status: true, message: "ip not found"});
  }

  const listener = await Listener.find({ userId: ip }).select('-__v');
 
  if (listener?.length > 0)
  listener?.map((x) => {
    artistTrack?.map((y) => {
       if (y?._id.equals(x?.trackId)) {
        y.isViewed = true
      }
    })
  })


  if (likes?.length > 0) {
    likes?.map((x) => {
      if (artist?._id.equals(x?.artistId)) {
        artist.isLiked = true
      }
    })

    likes?.map((x) => {
      artistTrack?.map((y) => {
           if (y?._id.equals(x?.trackId)) {
            y.isLiked = true
          }
        })
      })

  }
  
 

  const result = await ArtistComments.aggregate([
    {
      "$lookup": {
        "from": "artistcomments",
        "localField": "_id",
        "foreignField": "parentId",
        "as": "child"
      }
    },

  ])


  result.filter((item, index) => {
    if (item.parentId) {
      delete result[index]
    }
    return item
  })

  const artistComment = result.filter((item) => {
    return item !== null
  })


  if (artist) {
    return res.status(200).json({ artist: artist, artistTrack: artistTrack, artistAlbum: artistAlbum, artistPlaylist: artistPlaylist, similarArtist: similarArtist, artistComment: artistComment });
  }
  else {
    res.status(200).json({ status: true, message: "No record found" });
  }
});
