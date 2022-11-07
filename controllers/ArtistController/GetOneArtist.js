import { Artist } from "#models/ArtistModel/artist"
import asyncHandler from "#middlewares/asyncHandler";
import { Song, validate } from "#models/SongModel/song";
import {Playlist} from "#models/PlayListModel/playlist"
import { ArtistComments } from "#models/CommentsModel/artist_comments";
import { Album } from "#models/AlbumModel/album";

//@desc  Get One Artist 
//@route  /artist/id
//@request Get Request
//@acess  public

export const getOneArtist = asyncHandler(async (req, res) => {

  const artist = await Artist.findById(req.params.id).select("-__v");
 
  const artistTrack = await Song.find({artistId : req.params.id}).select("-__v");
  
  const artistPlaylist = await Playlist.find({artistId : req.params.id}).select('-__v');

  const artistAlbum = await Album.find({artistId : req.params.id}).select('-__v');

  const similarArtist = await Artist.find( { _id : { $ne  : req.params.id}} ).limit(20).select('-__v');

  const result  = await ArtistComments.aggregate([
    { "$lookup": {
      "from": "artistcomments",
      "localField": "_id",
      "foreignField": "parentId",
      "as": "child"
    }},

  ])


  result.filter((item,index) => {
    if(item.parentId)
    {
      delete result[index]
    }
    return item
  })
  
  const artistComment = result.filter((item) => {
    return item !== null
  })
 

if(artist)
  {
    return res.status(200).json({artist : artist,artistTrack : artistTrack ,artistAlbum : artistAlbum, artistPlaylist :  artistPlaylist , similarArtist: similarArtist , artistComment : artistComment});    
  }
  else {
    res.status(200).json({ status: true, message: "No record found" });
  }
});
