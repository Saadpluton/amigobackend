import {PlaylistTrack , validate} from "#models/PlayListTrackModel/playlistTrack"
import _ from "lodash";
import asyncHandler from "#middlewares/asyncHandler";
import {Song} from "#models/SongModel/song"
import {AlbumTrack} from "#models/AlbumTrackModel/albumTrack"
import {Playlist} from "#models/PlayListModel/playlist"

//@desc  update PlaylistTrack
//@route  /playlistTrack/update/:id
//@request Put Request
//@acess  public

export const updatePlaylistTrack = asyncHandler(async (req, res) => {

    const playlistTrack = await PlaylistTrack.findById(req.params.id);
    const song = await Song.findById(req.body.songId);
    const track = await AlbumTrack.findById(req.body.trackId);
    const playlist= await Playlist.findById(req.body.playlistId);
      
    if (!playlistTrack) {
        return res.status(404).json({ status: false, message: "PlaylistTrack record not found" })
    }
 
    // if (!playlist) {
    //   return res.status(404).json({ status: false, message: "Playlist record not found" })
    // }
    if (!song) {
        return res.status(404).json({ status: false, message: "Song record not found" })
    }
    if (!track) {
      return res.status(404).json({ status: false, message: "AlbumTrack record not found" })
    }
    
    const update = await PlaylistTrack.findByIdAndUpdate(req.params.id,{$set : {...req.body,image : `uploads/${req.file?.filename}`}})

    return res.status(200).json({ status: true, message: "PlaylistTrack updated successfully" })

})