import { Song, validate } from "#models/SongModel/song";
import asyncHandler from "#middlewares/asyncHandler";
import { Listener } from "#models/ListenerModel/listener";

//@desc  track Get
//@route  /track
//@request Get Request
//@acess  public

export const getTracks = asyncHandler(async (req, res) => {
  const songs = await Song.find().select("-__v");
  const listener = await Listener.find().select('-__v');


  const ip = req.socket.remoteAddress.split(':').at(-1)
  console.log(req.socket.remoteAddress.split(':').at(-1))

  if (songs.length > 0)
   {
    res.status(200).json({songs: songs ,ip :ip});
  } else {
    res.status(404).json({ status: false, message: "No record found" });
  }
});
