import {User , validate} from "#models/UserModel/user"
import asyncHandler from "#middlewares/asyncHandler";

import { AlbumComments } from "#models/CommentsModel/album_comments";
//@desc  Comments Get
//@route  /comments
//@request Get Request
//@acess  public

export const getAlbumComments = asyncHandler(async (req, res) => {
 
  const result  = await AlbumComments.aggregate([
    //{ "$match": { "userId": req.body.userId }},
    { "$lookup": {
      "from": "albumcomments",
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
  
  const albumComment = result.filter((item) => {
    return item !== null
  })

  const albumCommentsGet = albumComment.filter((item) => {   
    if(item?.albumId.toString() === req.params.id)
    {
      return item
    }
  })
  return albumCommentsGet
});
