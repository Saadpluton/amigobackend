import { Song, validate } from "#models/SongModel/song";
import asyncHandler from "#middlewares/asyncHandler";
import { Likes } from "#models/LikesModel/likes";
import { Listener } from "#models/ListenerModel/listener";
import mongoose from "mongoose";
import { getTrackComments } from "#controllers/CommentsController/GetTrackComments";
getTrackComments

//@desc  Get One Track
//@route  /track/id
//@request Get Request
//@acess  public

export const getOneTrack = asyncHandler(async (req, res) => {
  
  if(req.query.userId && req.query.userId !== "undefined")
  {
    if (!mongoose.Types.ObjectId.isValid(req.query.userId)) {
      return res.status(400).send({ status: false, message: 'Invalid user ID.' });
    }
    
  }
  const ip = req.socket.remoteAddress.split(':').at(-1)
  
  if (!ip) {
    return res
      .status(200)
      .json({ status: true, message: "ip not found"});
  }

  const songs = await Song.findById(req.params.id).select("-__v");
  const userId = req?.query?.userId !== undefined ? {userId :  req.query.userId} : {}

  let likes ;
  if(req?.query?.userId !== "undefined")
  {
   likes = await Likes.find( {userId :  req.query.userId}).select('-__v');
  }

  const listener = await Listener.find({ userId: ip }).select('-__v');

  if (likes?.length > 0) {
    likes?.map((x) => {
      if (songs?._id.equals(x?.trackId)) {
        songs.isLiked = true
      }
    })
  }

  if (listener?.length > 0)
  listener?.map((x) => {
    if (songs?._id.equals(x?.trackId)) {
      songs.isViewed = true
    }
  })

    
  const trackComments = await getTrackComments(req,res);

  if (songs) {
    return res.status(200).json(songs,trackComments);
  } else {
    res.status(200).json({ status: true, message: "No record found" });
  }
});
