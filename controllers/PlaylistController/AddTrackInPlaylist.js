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

  
    const {error} = validate(req.body);

    if (error)
    {
      return res.status(400).send({status : false , message : error?.details[0]?.message});
    }
    
    const user= await User.findById(req.body.userId);

    const track= await Song.findById(req.body.trackId);
   
    if (!user) {
      return res.status(404).json({ status: false, message: "User record not found" })
    }
    if (!track) {
      return res.status(404).json({ status: false, message: "Track record not found" })
    }
    if (!artist) {
      return res.status(404).json({ status: false, message: "Artist record not found" })
    }
   

    if(!req.file?.filename)
    {
      return res.status(400).json({ status: false, message: "Please Select the Image" })    
    }
    let playlists = new Playlist(_.pick(req.body, ['title','userId','description','trackId','artistId','image']))
    playlists.image = `uploads/${req.file?.filename}`
    playlists.trackName = track.name
    playlists.artistName = artist.name
    playlists.trackGenre = track.genre
    playlists.trackDuration = track.duration
    playlists.trackSubGenre = track.subGenre
    
    playlists = await playlists.save();

    return res.status(201).json({ status: true, message: "Playlist created successfully" })

  })
  