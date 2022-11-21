import { User, validate } from "#models/UserModel/user"
import { UserVerification } from "#models/UserModel/userVerification"
import asyncHandler from "#middlewares/asyncHandler";
import bcrypt from "bcrypt";
import { Artist } from "#models/ArtistModel/artist";

//@desc  update Password
//@route  /user/update
//@request Put Request
//@acess  public

export const updatePassword = asyncHandler(async (req, res) => {

    const obj = JSON.parse(JSON.stringify(req.body));
    const checkedvalid = await UserVerification.findOne({ email: obj.email , role : obj.role})
    if(!checkedvalid)
    {
        return res.status(404).json({status : true , message : "Please verify email before password updated!"})        
    }
    let salt , hashpassword , update ;
    if(obj.role === "user")
    {
        salt = bcrypt.genSalt(10)
        hashpassword = await bcrypt.hash(obj.password, parseInt(salt));
    
        update = await User.findOneAndUpdate({email :obj.email}, { password: hashpassword }, { new: true });
        await UserVerification.findOneAndDelete({email : obj.email ,  role : obj.role});
        return res.status(200).json({status : true , message : "Password updated successfully" ,user : update})
     
    }
    else if(obj.role === "artist")
    {
        salt = bcrypt.genSalt(10)
        hashpassword = await bcrypt.hash(obj.password, parseInt(salt));
    
        update = await Artist.findOneAndUpdate({email :obj.email}, { password: hashpassword }, { new: true });
        await UserVerification.findOneAndDelete({email : obj.email, role : obj.role});
        return res.status(200).json({status : true , message : "Password updated successfully" ,user : update})
      
    }
    else {
        return res
          .status(400)
          .json({ status: true, message: "Role is not valid!" });
      }
    
  
})