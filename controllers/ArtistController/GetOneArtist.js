import { Artist } from "#models/ArtistModel/artist"
import asyncHandler from "#middlewares/asyncHandler";
import { Song, validate } from "#models/SongModel/song";
import {Playlist} from "#models/PlayListModel/playlist"
//@desc  Get One Artist 
//@route  /artist/id
//@request Get Request
//@acess  public

export const getOneArtist = asyncHandler(async (req, res) => {

  const artist = await Artist.findById(req.params.id).select("-__v");
 
  const artistTrack = await Song.find({artistId : req.params.id}).select("-__v");
  
  const artistplaylist = await Playlist.find({artistId : req.params.id}).select('-__v');

  const similarArtist = await Artist.find( { _id : { $ne  : req.params.id}} ).limit(20).select('-__v');
 

  // const artistRecommend = await Artist.find({ genre: { $in: [req.query.genre] } , subGenre: { $in: [req.query.subGenre] }} ).select('-__v');
  
  // //const album = await Album.find({ genre: req.query.genre , subGenre: req.query.subGenre  }).select('-__v');

if(artist)
  {
    return res.status(200).json({artist : artist,artistTrack : artistTrack , artistplaylist :  artistplaylist , similarArtist:similarArtist});    
  }
  else {
    res.status(200).json({ status: true, message: "No record found" });
  }
});
