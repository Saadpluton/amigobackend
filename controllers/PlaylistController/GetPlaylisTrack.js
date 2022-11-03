import {Playlist , validate} from "#models/PlayListModel/playlist"
import asyncHandler from "#middlewares/asyncHandler";
import { Song } from "#models/SongModel/song";
import mongoose from "mongoose";

//@desc  Get Playlist Track
//@route  /playlistTrack
//@request Get Request
//@acess  public

export const getPlaylistTrack = asyncHandler(async (req, res) => {

  let ids ;
  ids = req.query.trackId?.split(',')
console.log(ids)
ids.map((item)=>{
 
  
 if (mongoose.Types.ObjectId.isValid(ids))
{
 return res.status(404).send( {status : false , message : 'Invalid ID.'});
}
 console.log(item)
})

// if (!mongoose.Types.ObjectId.isValid(ids))
// return res.status(404).send( {status : false , message : 'Invalid ID.'});


if(!ids)
{
  return res.status(400).json({ status: false, message: "TrackId invalid format or required must be comma seperate format!" });
}
  const playlistsTrack = await Song.find({_id : { $in : ids}}).select("-__v");

  if (playlistsTrack.length > 0) {
    return res.status(200).json(playlistsTrack);
  }
  else {
   return res.status(404).json({ status: false, message: "No record found" });
  }
});
