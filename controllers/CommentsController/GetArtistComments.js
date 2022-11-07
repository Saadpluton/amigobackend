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
      "as": "child"
    }},

  ])
  result.filter((item,index) => {
    if(item.parentId)
    {
      delete result[index]
    }
    return item
  })
  
  const artistComment = result.filter((item) => {
    return item !== null
  })

  if(artistComment.length > 0)
  {
   return res.status(200).json(artistComment);    
  }
  else{
      res.status(200).json({status : true , message : "No record found"});
  }
});
