import {Genre } from "#models/GenreModel/genre"
import asyncHandler from "#middlewares/asyncHandler";
import {Playlist } from "#models/PlayListModel/playlist"
import {Artist } from "#models/ArtistModel/artist"
import { Album } from "#models/AlbumModel/album";
import { Listener } from "#models/ListenerModel/listener";
import mongoose from "mongoose";

//@desc  Genre Get
//@route  /genre
//@request Get Request
//@acess  public

export const getGenresFiltration = asyncHandler(async (req, res) => {
  
  if (!mongoose.Types.ObjectId.isValid(req.query.genreId))
  {
  return res.status(400).send( {status : false , message : 'Invalid genre ID.'}); 
  }
 const ip = req.socket.remoteAddress.split(':').at(-1)

  if (!ip) {
    return res
      .status(200)
      .json({ status: true, message: "ip not found" });
  }

  const genre = await Genre.findById(req.query?.genreId).select('-__v');
  
  if(!genre)
  {
    return res
      .status(200)
      .json({ status: true, message: "Genre Record not found" });
  }
  const playlist = await Playlist.find({trackGenre: genre?.name}).select('-__v');
  const artist = await Artist.find({ genre: { $in: [genre?.name] }} ).select('-__v');
  const album = await Album.find({ genre: genre?.name}).select('-__v');
  const listener = await Listener.find({ userId: ip }).select('-__v');

  if (listener?.length > 0)
  {
    listener?.map((x) => {
      playlist?.map((y) => {
         if (y?._id.equals(x?.playlistId)) {
          y.isViewed = true
        }
      })
    })
    listener?.map((x) => {
      album?.map((y) => {
         if (y?._id.equals(x?.albumId)) {
          y.isViewed = true
        }
      })
    }) 
  }
    
if(playlist.length > 0 || artist.length > 0 || album.length > 0|| genre )
  {
    return res.status(200).json({genre : genre ,playlist : playlist , artist : artist , album : album });    
  }
  else{
     return res.status(200).json({status : true , message : "No record found"});
  }
});
