import {AlbumTrack , validate} from "#models/AlbumTrackModel/albumTrack"
import _ from "lodash";
import asyncHandler from "#middlewares/asyncHandler";
import {Song} from "#models/SongModel/song"
import {Album} from "#models/AlbumModel/album"


//@desc  AlbumTrack Create
//@route  /albumTrack
//@request Post Request
//@acess  public

export const createAlbumTrack = asyncHandler(async (req, res) => {

    const {error} = validate(req.body);

    if (error)
    {
      return res.status(400).send({status : false , message : error?.details[0]?.message});
    }
    const track = await Song.findById(req.body.songId);
    const album = await Album.findById(req.body.albumId);

    if (!track) {
        return res.status(404).json({ status: false, message: "Track record not found" })
    }
    
    if (!album) {
        return res.status(404).json({ status: false, message: "Album record not found" })
    }

    let albumTrack = new AlbumTrack(_.pick(req.body, ['albumId','songId']))
    albumTrack = await albumTrack.save();

    return res.status(201).json({ status: true, message: "AlbumTrack created successfully" })

  })
  