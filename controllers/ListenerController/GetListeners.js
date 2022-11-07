import {User , validate} from "#models/UserModel/user"
import asyncHandler from "#middlewares/asyncHandler";
import { Listener } from "#models/ListenerModel/listener";

//@desc  Listener Get
//@route  /trackListener
//@request Get Request
//@acess  public

export const getListener = asyncHandler(async (req, res) => {
  const listener = await Listener.find().select('-__v');

  if(listener.length > 0)
  {
    return res.status(200).json(listener);    
  }
  else{
      res.status(200).json({status : true , message : "No record found"});
  }
});
