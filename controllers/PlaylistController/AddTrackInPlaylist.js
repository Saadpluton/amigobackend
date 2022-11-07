import {Playlist , validate} from "#models/PlayListModel/playlist"
import _ from "lodash";
import asyncHandler from "#middlewares/asyncHandler";
import {User} from "#models/UserModel/user"
import { Song } from "#models/SongModel/song";
import {Artist } from "#models/ArtistModel/artist"

//@desc  Add track in Playlist
//@route  /addtrackplaylist
//@request Post Request
//@acess  public

export const addTrackPlaylist = asyncHandler(async (req, res) => {
    
    const user= await User.findById(req.body?.userId);
    const track= await Song.findById(req.body?.trackId);   
    const artist = await Artist.findById(track?.artistId);   

    const playList = await Playlist.findOne({_id : req.body?.playlistId , userId :req.body?.userId });
 
const playlistsTrack = await Playlist.findOne({_id:req.body?.playlistId,trackId : { $in : req.body?.trackId}}).select("-__v");

if (playlistsTrack) {
  return res.status(200).json({ status: true, message: "Track added already" })
}

const trackRecord = !playList?.trackId?.length > 0 ? 
  {
    image : track?.image,
    trackName : track?.name,
    artistName : track.artistName,
    trackGenre : track?.genre,
    trackDuration : track?.duration,
    trackSubGenre : track?.subGenre, 
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
  

    const update = await Playlist.findOneAndUpdate({_id : req.body?.playlistId , userId : req.body?.userId ,artistId :  req.body.artistId },{...trackRecord ,$push : {trackId : req.body.trackId}  })

    return res.status(200).json({ status: true, message: "Track added in playlist successfully" })

  })

  