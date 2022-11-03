import asyncHandler from "#middlewares/asyncHandler";
import { Listener } from "#models/ListenerModel/listener"
import { User } from "#models/UserModel/user";
import { Song, validate } from "#models/SongModel/song"

///@desc  Artsit Listener Create
//@route  /trackListener
//@request Post Request
//@acess  public

export const createListener = asyncHandler(async (req, res) => {

  const ip = req.socket.remoteAddress.split(':').at(-1)
console.log(ip)
  if (!ip) {
    return res
      .status(404)
      .json({ status: false, message: "ip not found"});
  }
  const track = await Song.findById(req.body.trackId);

  if (!track) {
    return res
      .status(404)
      .json({ status: false, message: "track record not found" });
  }

  const listenerValid = await Listener.findOne({ userId: ip, trackId: req.body.trackId });

  if (!listenerValid) {
    let listener = new Listener({ userId: ip, trackId: req.body.trackId })
    await listener.save();
    await Song.findByIdAndUpdate(req.body.trackId, {
      totalListeners: track.totalListeners + 1,
    });
    return res.status(201).json({ status: true, message: "Track listener created successfully" })
  }
  else {
    return res.status(403).json({ status: false, message: "Track listener already added" })
  }
});
