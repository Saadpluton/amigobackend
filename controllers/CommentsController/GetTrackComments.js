import { User, validate } from "#models/UserModel/user"
import asyncHandler from "#middlewares/asyncHandler";

import { TrackComments } from "#models/CommentsModel/track_comments";
//@desc  Comments Get
//@route  /comments
//@request Get Request
//@acess  public

export const getTrackComments = asyncHandler(async (req, res) => {

  const result = await TrackComments.aggregate([

    {
      $lookup: {
        from: 'trackcomments',
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
  
  const trackComments = result.filter((item) => {
    return item !== null
  })

  if (trackComments.length > 0) {
    return res.status(200).json(trackComments);
  }
  else {
    return res.status(200).json({ status: true, message: "No record found" });
  }

});
