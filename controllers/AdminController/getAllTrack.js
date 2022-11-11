import { Song, validate } from "#models/SongModel/song"
import asyncHandler from "#middlewares/asyncHandler";
import { Listener } from "#models/ListenerModel/listener";
import { Likes } from "#models/LikesModel/likes";

//@desc  Track Get
//@route  /Track
//@request Get Request
//@acess  public

export const getTracks = asyncHandler(async (req, res) => {

  const tracks = await Song.find();
  
  if (tracks.length > 0) {
    return res.status(200).json({
      status: true,
      tracks,
    })}
  else {
    return res.status(200).json({ status: true, message: "No Track record found" });
  }
});
