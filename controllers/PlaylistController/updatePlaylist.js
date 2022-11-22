import {Playlist , validate} from "#models/PlayListModel/playlist"
import _ from "lodash";
import asyncHandler from "#middlewares/asyncHandler";
import {User} from "#models/UserModel/user"
import { Song } from "#models/SongModel/song";
import { Artist } from "#models/ArtistModel/artist";
import mongoose from "mongoose";

//@desc  update Playlist
//@route  /playlist/update/:id
//@request Put Request
//@acess  public

export const updatePlaylist = asyncHandler(async (req, res) => {

    if(req.body.userId)
    {
    if (!mongoose.Types.ObjectId.isValid(req.body.userId))
    {
    return res.status(400).send( {status : false , message : 'Invalid user ID.'}); 
    }
  }
    if(req.body.artistId)
    {
      if (!mongoose.Types.ObjectId.isValid(req.body.artistId))
      {
      return res.status(400).send( {status : false , message : 'Invalid artist ID.'}); 
      } 
  
    }

    const user= await User.findById(req.body.userId);
    const track= await Song.findById(req.body.trackId);
    const artist= await Artist.findById(req.body.artistId);
      
    if (!artist && req.body.artistId) {
      return res.status(200).json({ status: true, message: "Artist record not found" })
    }

    if (!user && req.body.userId) {
      return res.status(200).json({ status: true, message: "User record not found" })
    }

    //const image = req.file ? `uploads/${req.file?.filename}` : undefined
  
    const trackId = req.body.trackId ? {trackName : track.name ,trackDuration : track.duration, trackGenre : track.genre}  : undefined
    const artistId = req.body.artistId ? {artistName : artist.name}  : undefined
 
    const update = await Playlist.findByIdAndUpdate(req.params.id,{$set : {...req.body,...trackId,...artistId}})

    return res.status(200).json({ status: true, message: "Playlist updated successfully" })

})