import { User, validate } from "#models/UserModel/user"
import { UserVerification } from "#models/UserModel/userVerification"
import asyncHandler from "#middlewares/asyncHandler";
import bcrypt from "bcrypt";

//@desc  update Password
//@route  /user/update
//@request Put Request
//@acess  public

export const updatePassword = asyncHandler(async (req, res) => {

    const obj = JSON.parse(JSON.stringify(req.body));
    const checkedvalid = await UserVerification.findOne({ email: obj.email})
    if(!checkedvalid)
    {
        return res.status(404).json({status : true , message : "Please verify email before password updated!"})        
    }
    const salt = bcrypt.genSalt(10)
    const hashpassword = await bcrypt.hash(obj.password, parseInt(salt));

    const update = await User.findOneAndUpdate({email :obj.email}, { password: hashpassword }, { new: true });
    await UserVerification.findOneAndDelete({email : obj.email});
    return res.status(200).json({status : true , message : "Password updated successfully" ,user : update})
 
})