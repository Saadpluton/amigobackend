import {Genre } from "#models/GenreModel/genre"
import asyncHandler from "#middlewares/asyncHandler";
import {Playlist } from "#models/PlayListModel/playlist"
import {Artist } from "#models/ArtistModel/artist"
import { Album } from "#models/AlbumModel/album";

//@desc  Genre Get
//@route  /genre
//@request Get Request
//@acess  public

export const getGenresFiltration = asyncHandler(async (req, res) => {
  
  
  // const playlist = await Playlist.find({trackGenre: req.query.genre ,  trackSubGenre: { $in: [req.query.subGenre] } }).select('-__v');
  // const artist = await Artist.find({ genre: { $in: [req.query.genre] } , subGenre: { $in: [req.query.subGenre] }} ).select('-__v');
  // //const album = await Album.find({ genre: { $in: [req.query.genre] } , subGenre: { $in: [req.query.subGenre] }).select('-__v');

  const playlist = await Playlist.find({trackGenre: req.query.genre}).select('-__v');
  const artist = await Artist.find({ genre: { $in: [req.query.genre] }} ).select('-__v');
  const album = await Album.find({ genre: req.query.genre}).select('-__v');
  
  
if(playlist.length > 0 || artist.length > 0 || album.length > 0 )
  {
    return res.status(200).json({playlist : playlist , artist : artist , album : album });    
  }
  else{
     return res.status(200).json({status : true , message : "No record found"});
  }
});
