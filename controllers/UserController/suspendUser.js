import {User , validate} from "#models/UserModel/user"
import asyncHandler from "#middlewares/asyncHandler";

//@desc  Suspend User
//@route  /user/suspend/:id
//@request Put Request
//@acess  public

export const suspendUser = asyncHandler(async (req, res) => {
    
    const { id } = req.params;
      const customer = await User.findById(id);

      if(customer)
     {
      if (customer.isSuspend === false){

        const Suspend = await User.findOneAndUpdate({_id :id}, { isSuspend: customer.isSuspend = true }, { new: true });
        res.status(200).json({status : true , message : "User has been enabled."});
      }
      else{
      const UnSuspend = await User.findOneAndUpdate({_id :id}, { isSuspend: customer.isSuspend = false }, { new: true });
      res.status(200).json({status : true , message : "User has been disabled."});  
    }
  }
  else{
    res.status(404).json({status : true , message : "No User Found."});  
  }
  });
  