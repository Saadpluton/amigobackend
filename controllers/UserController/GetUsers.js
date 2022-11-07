import {User , validate} from "#models/UserModel/user"
import asyncHandler from "#middlewares/asyncHandler";

//@desc  User Get
//@route  /user
//@request Get Request
//@acess  public

export const getUsers = asyncHandler(async (req, res) => {
  const customers = await User.find().select('-__v');

  if(customers.length > 0)
  {
    res.status(200).json(customers);    
  }
  else{
      res.status(404).json({status : true , message : "No record found"});
  }
});
