import {User , validate} from "#models/UserModel/user"
import asyncHandler from "#middlewares/asyncHandler";
import { Comments } from "#models/CommentsModel/comments";

//@desc  Comments Get
//@route  /comments
//@request Get Request
//@acess  public

export const getComments = asyncHandler(async (req, res) => {
 
  const comments = await Comments.find();
 
  const result  = await Comments.aggregate([
    //{ "$match": { "userId": req.body.userId }},
    { "$lookup": {
      "from": "comments",
      "localField": "_id",
      "foreignField": "parentId",
      "as": "Record"
    }},
    //{ $unwind: "$Record" },
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
