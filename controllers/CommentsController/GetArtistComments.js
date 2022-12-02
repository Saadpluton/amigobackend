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

  
  const netedComments  = await ArtistComments.aggregate([
    { "$lookup": {
      "from": "artistcomments",
      "localField": "parentId",
      "foreignField": "parentId",
      "as": "Nestedchild"
    }},
  ])

  //console.log(netedComments)

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

  const artistCommentsGet = artistComment.filter((item) => {   
    if(item.artistId.toString() === req.query.artistId)
    {
      return item
    }
  })
  //await ArtistComments.populate(artistCommentsGet, {path: "userId"});

  return artistCommentsGet
});
