import {User , validate} from "#models/UserModel/user"
import asyncHandler from "#middlewares/asyncHandler";

import { PlaylistComments } from "#models/CommentsModel/playlist_comments";
//@desc  Comments Get
//@route  /comments
//@request Get Request
//@acess  public

export const getPlaylistComments = asyncHandler(async (req, res) => {
 
  const playlistComments = await PlaylistComments.find();
 
  // const result  = await PlaylistComments.aggregate([
  //   //{ "$match": { "userId": req.body.userId }},
  //   { "$lookup": {
  //     "from": "Playlistcomments",
  //     "localField": "_id",
  //     "foreignField": "parentId",
  //     "as": "Record"
  //   }},
  //   // { $unwind: "$Record" },
  //   // {$project : {

  //   //  Record : "$Record", 
  //   //  comments : 1
  //   // }} 
  // ])

  if(playlistComments.length > 0)
  {
   return res.status(200).json(playlistComments);    
  }
  else{
      res.status(404).json({status : false , message : "No record found"});
  }
});
