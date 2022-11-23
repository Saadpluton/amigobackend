import {Album } from "#models/AlbumModel/album"
import asyncHandler from "#middlewares/asyncHandler";
import { Artist } from "#models/ArtistModel/artist"
import { Song } from "#models/SongModel/song";
import { Likes } from "#models/LikesModel/likes";
import { Listener } from "#models/ListenerModel/listener";
import { getAlbumComments } from "#controllers/CommentsController/GetAlbumComments";

//@desc  Get One Album 
//@route  /album/id
//@request Get Request
//@acess  public


export const getOneAlbum = asyncHandler(async (req, res) => {

  const ip = req.socket.remoteAddress.split(':').at(-1)
  const album = await Album.findById(req.params.id);

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
      if (album?._id.equals(x?.albumId)) {
        album.isViewed = true
      }
    })

    const similarAlbum = await Album.find({ _id : { $ne  : req.params.id}}).limit(20).select('-__v');

    const albumTrack = await Song.find({ _id: { $in: album?.trackId } }).select("-__v");  
  
    const similarArtist = await Artist.find().limit(20).select('-__v');
  
    if (listener?.length > 0)
    listener?.map((x) => {
      albumTrack?.map((y) => {
         if (y?._id.equals(x?.trackId)) {
          y.isViewed = true
        }
      })
    })

    if (likes?.length > 0)
    likes?.map((x) => {
      albumTrack?.map((y) => {
           if (y?._id.equals(x?.trackId)) {
            y.isLiked = true
          }
        })
      })
   
    const albumComments = await getAlbumComments(req,res)

    if (album) {
    return res.status(200).json({album : album ,albumTrack : albumTrack , similarAlbum : similarAlbum , similarArtist : similarArtist , albumComments : albumComments});
  }
  else {
    return res.status(200).json({ status: true, message: "No record found" });
  }
});
