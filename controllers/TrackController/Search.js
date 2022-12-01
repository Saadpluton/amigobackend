import { Playlist} from "#models/PlayListModel/playlist"
import asyncHandler from "#middlewares/asyncHandler";
import { Artist } from "#models/ArtistModel/artist";
import { Song } from "#models/SongModel/song";
import { Album } from "#models/AlbumModel/album";

//@desc  Search
//@route  /playlist/id
//@request Get Request
//@acess  public

export const getSearch = asyncHandler(async (req, res) => {

if(req.query.search === "")
{
  return res.status(200).json({ status: true, message: "No record found" });
}

  var regex = new RegExp("^" + req.query.search, "i");
  
    const name =
    req.query.search ? { name: { $regex: regex }} : undefined;

    const title =
    req.query.search ? { title : { $regex: regex }} : undefined;

    const gender =
    req.query.search ? { gender: { $regex: regex }} : undefined;
  
    const genre =
    req.query.search ?  { genre: { $regex: regex }} : undefined;

  let arrTrack = [name , genre];
  let arrArtist = [name, gender, genre];
  let arrPlaylistAndALlbum = [title, genre]
 

  const resultQueryTrack = arrTrack.filter((item) => {
    return item;
  });
  
  const resultQueryArtist = arrArtist.filter((item) => {
    return item;
  });
 
  const resultQueryPlaylistAndAlbum = arrPlaylistAndALlbum.filter((item) => {
    return item;
  });
 

  
       
    const similarTrack = await Song.find({ $and : [ {$or : resultQueryTrack }]}).limit(10).sort({ name : -1}).select("-__v");  
 
    const similarArtist = await Artist.find({ $and : [ {$or : resultQueryArtist }]}).limit(10).sort({ name : -1}).select('-__v');
 
    const similarPlaylist = await Playlist.find({ $and : [ {$or : resultQueryPlaylistAndAlbum }]}).limit(10).sort({ title : -1}).select('-__v');
  
    const similarAlbum = await Album.find({ $and : [ {$or : resultQueryPlaylistAndAlbum }]}).limit(10).sort({ title : -1}).select('-__v');
  
    const data = [...similarTrack , ...similarArtist , ...similarAlbum , ...similarPlaylist]

    if (data.length > 0) 
    {
    return res.status(200).json(data);
  }
  else {
    return res.status(200).json({ status: true, message: "No record found" });
  }
});

  // db.customers.find({
  //   $and: [
  //     {
  //       $or: [
  //         {
  //           "Country": "Germany"
  //         },
  //         {
  //           "Country": "France"
  //         }
  //       ]
  //     },
  //     {
  //       VIP: true
  //     }
  //   ]
  // })