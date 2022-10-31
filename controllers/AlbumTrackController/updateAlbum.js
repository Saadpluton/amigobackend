import asyncHandler from "#middlewares/asyncHandler";
import _ from "lodash";
import {Song} from "#models/SongModel/song"
import {Album} from "#models/AlbumModel/album"

import {AlbumTrack , validate} from "#models/AlbumTrackModel/albumTrack"

//@desc  update AlbumTrack Profile
//@route  /albumTrack/update/:id
//@request Put Request
//@acess  public

export const updateAlbumTrack = asyncHandler(async (req, res) => {

    const song = await Song.findById(req.body.songId);
    const album = await Album.findById(req.body.albumId);

    // if (!song && req.body.songId) {
    //     return res.status(404).json({ status: false, message: "Song record not found" })
    // }
    
    if (!album && req.body.albumId) {
        return res.status(404).json({ status: false, message: "Album record not found" })
    }
  
    const update = await AlbumTrack.findByIdAndUpdate(req.params.id,{$set : req.body})

    return res.status(200).json({ status: true, message: "AlbumTrack updated successfully" })

})