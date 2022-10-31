import {User , validate} from "#models/UserModel/user"
import asyncHandler from "#middlewares/asyncHandler";

//@desc  Get One User 
//@route  /user/id
//@request Get Request
//@acess  public

export const getOneUser = asyncHandler(async (req, res) => {

  const user = await User.findById(req.params.id).select("-__v");

  if(user)
  {
    res.status(200).json(user);    
  }
  else{
      res.status(404).json({status : false , message : "No record found"});
  }
});
