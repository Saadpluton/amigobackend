// import asyncHandler from "#middlewares/asyncHandler";
// import { Comments } from "#models/CommentsModel/comments";
// import { User } from "#models/UserModel/user";
// import {Playlist , validate} from "#models/PlayListModel/playlist"
// //@desc  Comments Create And Remove
// //@route  /Comments
// //@request Post Request
// //@acess  public

// export const playlistComments = asyncHandler(async (req, res) => {

//   const user = await User.findById(req.body.userId);
//   if (!user) {
//     return res
//       .status(404)
//       .json({ status: false, message: "User record not found" });
//   }
//   const playlist = await Playlist.findById(req.body.playlistId);

//   if (!playlist) {
//     return res
//       .status(404)
//       .json({ status: false, message: "playlist record not found" });
//   }
  
//   let comments = new Comments({ userId: req.body.userId, playlistId: req.body.playlistId , comments : req.body.comments });
//     await comments.save();
//     await Playlist.findByIdAndUpdate(req.body.playlistId, {
//       totalComments: playlist.totalComments + 1,
//     });
//     return res
//       .status(201)
//       .json({ status: true, message: "playlist Comments created successfully" });
  
// });
