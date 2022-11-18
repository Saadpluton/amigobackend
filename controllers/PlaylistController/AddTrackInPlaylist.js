import {Playlist , validate} from "#models/PlayListModel/playlist"
import _ from "lodash";
import asyncHandler from "#middlewares/asyncHandler";
import {User} from "#models/UserModel/user"
import { Song } from "#models/SongModel/song";
import {Artist } from "#models/ArtistModel/artist"
import mongoose from "mongoose";

//@desc  Add track in Playlist
//@route  /addtrackplaylist
//@request Post Request
//@acess  public

export const addTrackPlaylist = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.body.playlistId))
  {
  return res.status(400).send( {status : false , message : 'Invalid playlist ID.'}); 
  }
  if(req.body.artistId)
  {
    if (!mongoose.Types.ObjectId.isValid(req.body.artistId))
    {
    return res.status(400).send( {status : false , message : 'Invalid artist ID.'}); 
    } 
  }
  if(req.body.userId)
  {
  if (!mongoose.Types.ObjectId.isValid(req.body.userId))
  {
  return res.status(400).send( {status : false , message : 'Invalid user ID.'}); 
  }
}
  if (!mongoose.Types.ObjectId.isValid(req.body.trackId))
  {
  return res.status(400).send( {status : false , message : 'Invalid trackId ID.'}); 
  } 


    const user= await User.findById(req.body?.userId);
    const track= await Song.findById(req.body?.trackId);   
    const artist = await Artist.findById(req.body?.artistId);   

 let playList ;
    if(req.body.userId)
    {
      playList = await Playlist.findOne({_id : req.body?.playlistId , userId :req.body?.userId });
    }
    else{
      playList = await Playlist.findOne({_id : req.body?.playlistId , artistId :req.body?.artistId });
    }
    
const playlistsTrack = await Playlist.findOne({_id:req.body?.playlistId,trackId : { $in : req.body?.trackId}}).select("-__v");

if (playlistsTrack) {
  return res.status(200).json({ status: true, message: "Track added already" })
}

const trackRecord = !playList?.trackId?.length > 0 ? 
  {
    image : track?.image,
    trackName : track?.name,
    artistName : track?.artistName,
    trackDuration : track?.duration, 
  }
:
undefined


    if (!playList) {
      return res.status(200).json({ status: true, message: "PlayList record not found" })
    }
    if (!artist && req.body.artistId) {
      return res.status(200).json({ status: true, message: "Artist record not found" })
    }

    if (!user && req.body.userId) {
      return res.status(200).json({ status: true, message: "User record not found" })
    }
    if (!track) {
      return res.status(200).json({ status: true, message: "Track record not found" })
    }
  

    const update = await Playlist.findOneAndUpdate({_id : req.body?.playlistId , userId : req.body?.userId ,artistId :  req.body?.artistId },{...trackRecord ,$push : {trackId : req.body?.trackId}  })

    return res.status(200).json({ status: true, message: "Track added in playlist successfully" })

  })

  