import {Playlist , validate} from "#models/PlayListModel/playlist"
import _ from "lodash";
import asyncHandler from "#middlewares/asyncHandler";
import {User} from "#models/UserModel/user"
import { Song } from "#models/SongModel/song";
import { Artist } from "#models/ArtistModel/artist";

//@desc  update Playlist
//@route  /playlist/update/:id
//@request Put Request
//@acess  public

export const updatePlaylist = asyncHandler(async (req, res) => {

    const user= await User.findById(req.body.userId);
    const track= await Song.findById(req.body.trackId);
    const artist= await Artist.findById(req.body.artistId);

   
    if (!user) {
      return res.status(404).json({ status: false, message: "User record not found" })
    }

    if (!track) {
      return res.status(404).json({ status: false, message: "Track record not found" })
    }
    if (!artist) {
      return res.status(404).json({ status: false, message: "Artist record not found" })
    }
    const image = req.file ? `uploads/${req.file?.filename}` : undefined
  
    const trackId = req.body.trackId ? {trackName : track.name ,trackDuration : track.duration, trackGenre : track.genre}  : undefined
    const artistId = req.body.artistId ? {artistName : artist.name}  : undefined
 
    const update = await Playlist.findByIdAndUpdate(req.params.id,{$set : {...req.body, image,...trackId,...artistId}})

    return res.status(200).json({ status: true, message: "Playlist updated successfully" })

})