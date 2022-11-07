import { Playlist, validate } from "#models/PlayListModel/playlist"
import asyncHandler from "#middlewares/asyncHandler";
import { Song } from "#models/SongModel/song";
import mongoose from "mongoose";
import Joi from "joi";
import JoiObjectId from "joi-objectid";
const mongoonse_id = JoiObjectId(Joi);

//@desc  Get Playlist Track
//@route  /playlistTrack
//@request Get Request
//@acess  public

export const getPlaylistTrack = asyncHandler(async (req, res) => {

  let ids;

  if(req.query.trackId?.length > 0)
  {
    ids = req.query.trackId?.split(',')
  }
  
  if (!ids) {
    return res.status(400).json({ status: false, message: "TrackId required must be comma seperate format!" });
  }

  let validArrIds = []
  ids.map((item) => {
    if (mongoose.Types.ObjectId.isValid(item)) {
      validArrIds.push(item)
    }
  })

if (validArrIds.length === ids.length) {
    const playlistsTrack = await Song.find({ _id: { $in: ids } }).select("-__v");

    if (playlistsTrack.length > 0) {
      return res.status(200).json(playlistsTrack);
    }
    else {
      return res.status(200).json({ status: true, message: "No record found" });
    }
  }
  else {
    return res.status(400).json({ status: false, message: "Invalid trackId" });

  }
});
