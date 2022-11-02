import {User , validate} from "#models/UserModel/user"
import asyncHandler from "#middlewares/asyncHandler";

import { TrackComments } from "#models/CommentsModel/track_comments";
//@desc  Comments Get
//@route  /comments
//@request Get Request
//@acess  public

export const getTrackComments = asyncHandler(async (req, res) => {
 
  // const result  = await TrackComments.aggregate([
  //   //{ "$match": { "userId": req.body.userId }},
  //   { "$lookup": {
  //     "from": "trackcomments",
  //     "localField": "_id",
  //     "foreignField": "parentId",
  //     "as": "Record"
  //   }},
  //   //{ $unwind: "$Record" },
  //   // {$project : {

  //   //  Record : "$Record", 
  //   //  comments : 1
  //   // }} 
  // ])
  const result = await TrackComments.aggregate([
    // {
    //     $match:{
    //         _id:"63620e986fed3ae78ca29d6a"
    //     }
    // },
   {
        $lookup:{
            from:'trackcomments',
            localField:'_id',
            foreignField:'parentId',
            as:'Record'
        }
    },{
        $unwind:'$Record'
    },
  ])

  if(result.length > 0)
  {
   return res.status(200).json(result);    
  }
  else{
      res.status(404).json({status : false , message : "No record found"});
  }
});
