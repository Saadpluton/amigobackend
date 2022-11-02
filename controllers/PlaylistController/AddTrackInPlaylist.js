import {Playlist , validate} from "#models/PlayListModel/playlist"
import _ from "lodash";
import asyncHandler from "#middlewares/asyncHandler";
import {User} from "#models/UserModel/user"
import { Song } from "#models/SongModel/song";
import { Artist } from "#models/ArtistModel/artist";

//@desc  Add track in Playlist
//@route  /addtrackplaylist
//@request Post Request
//@acess  public

export const addTrackPlaylist = asyncHandler(async (req, res) => {
    
    const user= await User.findById(req.body.userId);
    const track= await Song.findById(req.body.trackId);
   
    if (!user) {
      return res.status(404).json({ status: false, message: "User record not found" })
    }
    if (!track) {
      return res.status(404).json({ status: false, message: "Track record not found" })
    }
  

    if(!req.file?.filename)
    {
      return res.status(400).json({ status: false, message: "Please Select the Image" })    
    }
 
    const update = await Playlist.findByIdAndUpdate(req.body.playlistId,{$push : {trackId : req.body.trackId}})

    return res.status(201).json({ status: true, message: "Playlist created successfully" })

  })

  