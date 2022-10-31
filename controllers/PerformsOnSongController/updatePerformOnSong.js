import asyncHandler from "#middlewares/asyncHandler";
import _ from "lodash";
import {Song} from "#models/SongModel/song"
import {Artist} from "#models/ArtistModel/artist"

import {PerformOnSong , validate} from "#models/PerformOnSongModel/performsOnSong"

//@desc  update PerformOnSong Profile
//@route  /performOnSong/update/:id
//@request Put Request
//@acess  public

export const updatePerformOnSong = asyncHandler(async (req, res) => {
    const performOnSong = await PerformOnSong.findById(req.params.id);
    const song = await Song.findById(req.body.songId);
    const artist = await Artist.findById(req.body.artistId);

    if (!performOnSong) {
        return res.status(404).json({ status: false, message: "PerformOnSong record not found" })
    }
    if (!song) {
        return res.status(404).json({ status: false, message: "Song record not found" })
    }
    
    if (!artist) {
        return res.status(404).json({ status: false, message: "Artist record not found" })
    }

    const update = await PerformOnSong.findByIdAndUpdate(req.params.id,{$set : req.body})

    return res.status(200).json({ status: true, message: "PerformOnSong updated successfully" })

})