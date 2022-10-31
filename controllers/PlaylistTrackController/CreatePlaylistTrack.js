import {PlaylistTrack , validate} from "#models/PlayListTrackModel/playlistTrack"
import _ from "lodash";
import asyncHandler from "#middlewares/asyncHandler";
import {Song} from "#models/SongModel/song"
import {AlbumTrack} from "#models/AlbumTrackModel/albumTrack"
import {Playlist} from "#models/PlayListModel/playlist"

//@desc  PlaylistTrack Create
//@route  /playlistTrack
//@request Post Request
//@acess  public

export const createPlaylistTrack = asyncHandler(async (req, res) => {

    const {error} = validate(req.body);

    if (error)
    {
      return res.status(400).send({status : false , message : error?.details[0]?.message});
    }
    const song = await Song.findById(req.body.songId);
    const track = await AlbumTrack.findById(req.body.trackId);
    const playlist= await Playlist.findById(req.body.playlistId);

    
    // if (!playlist) {
    //   return res.status(404).json({ status: false, message: "Playlist record not found" })
    // }
    if (!song) {
        return res.status(404).json({ status: false, message: "Song record not found" })
    }
    if (!track) {
      return res.status(404).json({ status: false, message: "AlbumTrack record not found" })
    }
    
    if(!req.file?.filename)
    {
      return res.status(400).json({ status: false, message: "Please Select the Image" })    
    }

    let playlistTracks = new PlaylistTrack(_.pick(req.body, ['playlistId','trackId','songId','image']))
    playlistTracks.image = `uploads/${req.file?.filename}`
    playlistTracks = await playlistTracks.save();

    return res.status(201).json({ status: true, message: "PlaylistTrack created successfully" })

  })
  