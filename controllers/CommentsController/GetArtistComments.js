import {User , validate} from "#models/UserModel/user"
import asyncHandler from "#middlewares/asyncHandler";

import { ArtistComments } from "#models/CommentsModel/artist_comments";
//@desc  Comments Get
//@route  /comments
//@request Get Request
//@acess  public

export const getArtistComments = asyncHandler(async (req, res) => {
 
  const comments = await ArtistComments.find();
 
  const result  = await ArtistComments.aggregate([
    //{ "$match": { "userId": req.body.userId }},
    { "$lookup": {
      "from": "artistcomments",
      "localField": "_id",
      "foreignField": "parentId",
      "as": "Record"
    }},
    // { $unwind: "$Record" },
    // {$project : {

    //  Record : "$Record", 
    //  comments : 1
    // }} 
  ])

  if(result.length > 0)
  {
   return res.status(200).json(result);    
  }
  else{
      res.status(404).json({status : false , message : "No record found"});
  }
});
