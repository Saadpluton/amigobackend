import { Song, validate } from "#models/SongModel/song";
import asyncHandler from "#middlewares/asyncHandler";
import { Listener } from "#models/ListenerModel/listener";

//@desc  track Get
//@route  /track
//@request Get Request
//@acess  public

export const getTracks = asyncHandler(async (req, res) => {

  const ip = req.socket.remoteAddress.split(':').at(-1)
  
  if (!ip) {
    return res
      .status(404)
      .json({ status: true, message: "ip not found"});
  }

  const songs = await Song.find().select("-__v");

  const listener = await Listener.find({ userId: ip }).select('-__v');

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
    return res.status(404).json({ status: true, message: "No record found" });
  }
});
