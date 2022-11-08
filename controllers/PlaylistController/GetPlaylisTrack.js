import { Playlist, validate } from "#models/PlayListModel/playlist"
import asyncHandler from "#middlewares/asyncHandler";
import { Song } from "#models/SongModel/song";
import mongoose from "mongoose";
import Joi from "joi";
import JoiObjectId from "joi-objectid";
import { Listener } from "#models/ListenerModel/listener";
import { Likes } from "#models/LikesModel/likes";
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
  const ip = req.socket.remoteAddress.split(':').at(-1)
  
  if (!ip) {
    return res
      .status(200)
      .json({ status: true, message: "ip not found"});
  }

  const playlistsTrack = await Song.find({ _id: { $in: ids } }).select("-__v");
  const listener = await Listener.find({ userId: ip }).select('-__v');

  let likes ;
  if(req?.query?.userId !== "undefined")
  {
   likes = await Likes.find( {userId :  req.query.userId}).select('-__v');
  }
  
  if (listener?.length > 0)
    listener?.map((x) => {
      playlistsTrack?.map((y) => {
         if (y?._id.equals(x?.trackId)) {
          y.isViewed = true
        }
      })
    })


    if (likes?.length > 0)
    likes?.map((x) => {
      playlistsTrack?.map((y) => {
           if (y?._id.equals(x?.trackId)) {
            y.isLiked = true
          }
        })
      })
   
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
