import { Song, validate } from "#models/SongModel/song";
import asyncHandler from "#middlewares/asyncHandler";
import { Listener } from "#models/ListenerModel/listener";
import { Likes } from "#models/LikesModel/likes";
import mongoose from "mongoose";
import { TOTALLIKES, TOTALLISTENERS } from "#constant/constant";
//@desc  track Get
//@route  /track
//@request Get Request
//@acess  public

export const getTracks = asyncHandler(async (req, res) => {

  const ip = req.socket.remoteAddress.split(':').at(-1)

  if (req.query.userId && req.query.userId !== "undefined") {
    if (!mongoose.Types.ObjectId.isValid(req.query.userId)) {
      return res.status(400).send({ status: false, message: 'Invalid user ID.' });
    }

  }
  if (!ip) {
    return res
      .status(200)
      .json({ status: true, message: "ip not found" });
  }


  let songs = await Song.find({ isTrending: false, totalListeners: { $gte: TOTALLISTENERS }, totalLikes: { $gte: TOTALLIKES } })
    .sort({ totalListeners: -1, totalLikes: -1 })
    .limit(5)
    .select("-__v");

  const listener = await Listener.find({ userId: ip }).select('-__v');


  let likes;
  if (req?.query?.userId !== "undefined") {
    likes = await Likes.find({ userId: req.query.userId }).select('-__v');
  }

  const trendingSongsByAdmin = await Song.find({ isTrending: true }).select("-__v");

   if(trendingSongsByAdmin.length > 0)
   {
    songs = [...songs , ...trendingSongsByAdmin]        
   }

  if (likes?.length > 0)
    likes?.map((x) => {
      songs?.map((y) => {
        if (y?._id.equals(x?.trackId)) {
          y.isLiked = true
        }
      })
    })

  if (listener?.length > 0)
    listener?.map((x) => {
      songs?.map((y) => {
        if (y?._id.equals(x?.trackId)) {
          y.isViewed = true
        }
      })
    })


  if (songs?.length > 0) {
    return res.status(200).json(songs);
  } else {
    return res.status(200).json({ status: true, message: "No record found" });
  }
});
