import { Song, validate } from "#models/SongModel/song";
import asyncHandler from "#middlewares/asyncHandler";
import { Listener } from "#models/ListenerModel/listener";
import { Likes } from "#models/LikesModel/likes";

//@desc  track Get
//@route  /track
//@request Get Request
//@acess  public

export const getTracks = asyncHandler(async (req, res) => {

  const ip = req.socket.remoteAddress.split(':').at(-1)
  
  if (!ip) {
    return res
      .status(200)
      .json({ status: true, message: "ip not found"});
  }

  const songs = await Song.find().select("-__v");

  const listener = await Listener.find({ userId: ip }).select('-__v');

  const userId = req?.query?.userId !== undefined ? {userId :  req.query.userId} : {}

    const likes = await Likes.find(userId).select('-__v');

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
