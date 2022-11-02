import {Playlist , validate} from "#models/PlayListModel/playlist"
import _ from "lodash";
import asyncHandler from "#middlewares/asyncHandler";
import {User} from "#models/UserModel/user"
import { Song } from "#models/SongModel/song";

//@desc  Add track in Playlist
//@route  /addtrackplaylist
//@request Post Request
//@acess  public

export const addTrackPlaylist = asyncHandler(async (req, res) => {
    
    const user= await User.findById(req.body.userId);
    const track= await Song.findById(req.body.trackId);   
    const playList = await Playlist.findOne({_id : req.body.playlistId , userId :req.body.userId });
    
  const playlistsTrack = await Playlist.findOne({_id:req.body.playlistId,trackId : { $in : req.body.trackId}}).select("-__v");

console.log(playlistsTrack);
   console.log(playList.trackId);
    
  //  const trackFind = playList.trackId.some((item)=>{
  //     req.body.trackId === item.trackId
  //   })

    if (!playList) {
      return res.status(404).json({ status: false, message: "PlayList record not found" })
    }
    if (!user) {
      return res.status(404).json({ status: false, message: "User record not found" })
    }
    if (!track) {
      return res.status(404).json({ status: false, message: "Track record not found" })
    }
  
 
    const update = await Playlist.findOneAndUpdate({_id : req.body.playlistId , userId : req.body.userId },{$push : {trackId : req.body.trackId}})

    return res.status(200).json({ status: true, message: "Track added in playlist successfully" })

  })

  