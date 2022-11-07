import {User , validate} from "#models/UserModel/user"
import asyncHandler from "#middlewares/asyncHandler";
import { Likes } from "#models/LikesModel/likes";

//@desc  Likes Get
//@route  /likes
//@request Get Request
//@acess  public

export const getLikes = asyncHandler(async (req, res) => {
  const likes = await Likes.find().select('-__v');

  if(likes.length > 0)
  {
    res.status(200).json(likes);    
  }
  else{
      res.status(200).json({status : true , message : "No record found"});
  }
});
