import {User , validate} from "#models/UserModel/user"
import asyncHandler from "#middlewares/asyncHandler";

import { PlaylistComments } from "#models/CommentsModel/playlist_comments";
//@desc  Comments Get
//@route  /comments
//@request Get Request
//@acess  public

export const getPlaylistComments = asyncHandler(async (req, res) => {
 
  const result = await PlaylistComments.aggregate([

    {
      $lookup: {
        from: 'playlistcomments',
        localField: '_id',
        foreignField: 'parentId',
        as: 'child'
      }
    }
  ])
  
  result.filter((item,index) => {
    if(item.parentId)
    {
      delete result[index]
    }
    return item
  })
  
  const playlistComment = result.filter((item) => {
    return item !== null
  })

  if (playlistComment.length > 0) {
    return res.status(200).json(playlistComment);
  }
  else {
    return res.status(200).json({ status: true, message: "No record found" });
  }

});
