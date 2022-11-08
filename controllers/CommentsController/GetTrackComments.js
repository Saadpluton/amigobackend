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

let trackCommentsGet;
  if(trackComments.length > 0)
{
   trackCommentsGet = trackComments.filter((item) => {   
    if(item?.trackId.toString() === req.params.id)
    {
      return item
    }
  })

}
  
  if (trackCommentsGet?.length > 0) {
    return res.status(200).json(trackCommentsGet);
  }
  else {
    return res.status(200).json({ status: true, message: "No record found" });
  }

});
