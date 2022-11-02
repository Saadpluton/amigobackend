import asyncHandler from "#middlewares/asyncHandler";
import { TrackComments } from "#models/CommentsModel/track_comments";
import { User } from "#models/UserModel/user";
import { Song } from "#models/SongModel/song";

//@desc  Comments Create And Remove
//@route  /Comments
//@request Post Request
//@acess  public

export const trackComments = asyncHandler(async (req, res) => {

  const user = await User.findById(req.body.userId);
  if (!user) {
    return res
      .status(404)
      .json({ status: false, message: "User record not found" });
  }
  const song = await Song.findById(req.body.trackId);

  if (!song) {
    return res
      .status(404)
      .json({ status: false, message: "Track record not found" });
  }
  const CommentsParentValid = await TrackComments.findById(req.body.parentId);

  if(!CommentsParentValid && req.body.parentId)
  {
 return res
      .status(404)
      .json({ status: false, message: "Track parent record not found" }); 
  }
    const parentId =  req.body.parentId ? req.body.parentId : undefined

  let comments = new TrackComments({ userId: req.body.userId, trackId: req.body.trackId , comments : req.body.comments , parentId });
    await comments.save();
    await Song.findByIdAndUpdate(req.body.trackId, {
      totalComments: song.totalComments + 1,
    });
    return res
      .status(201)
      .json({ status: true, message: "Track Comments created successfully" });
  
});