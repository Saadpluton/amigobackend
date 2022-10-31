import {PerformOnSong , validate} from "#models/PerformOnSongModel/performsOnSong"
import _ from "lodash";
import asyncHandler from "#middlewares/asyncHandler";
import {Song} from "#models/SongModel/song"
import {Artist} from "#models/ArtistModel/artist"


//@desc  PerformOnSong Create
//@route  /PerformOnSong
//@request Post Request
//@acess  public

export const createPerformOnSong = asyncHandler(async (req, res) => {

    const {error} = validate(req.body);

    if (error)
    {
      return res.status(400).send({status : false , message : error?.details[0]?.message});
    }
    const song = await Song.findById(req.body.songId);
    const artist = await Artist.findById(req.body.artistId);

    if (!song) {
        return res.status(404).json({ status: false, message: "Song record not found" })
    }
    
    if (!artist) {
        return res.status(404).json({ status: false, message: "Artist record not found" })
    }

    let performOnSong = new PerformOnSong(_.pick(req.body, ['artistId','songId']))
    performOnSong = await performOnSong.save();

    return res.status(201).json({ status: true, message: "PerformOnSong created successfully" })

  })
  