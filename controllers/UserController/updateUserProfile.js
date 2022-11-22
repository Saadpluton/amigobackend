import { User, validate } from "#models/UserModel/user"
import asyncHandler from "#middlewares/asyncHandler";

import { PNG, JPG, JPEG, MP3, MPEG, PATH } from "#constant/constant";
//@desc  update Profile
//@route  /user/update/:id
//@request Put Request
//@acess  public

export const updateProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id);
    
    if (!user) {
        return res.status(404).json({ status: true, message: "User record not found" })
    }

    const userEmailValid = await User.findOne({ email: req.body?.email });

    if ((user.email !== userEmailValid?.email) && req.body.email ) {
        return res.status(403).json({ status: true, message: "Email Must Be Unique" })
    }
    const profileComplete = 70
    let imageFile = req.files?.image?.[0];
    let coverFile = req.files?.cover?.[0];
  
    // if (![PNG, JPEG, JPG].includes(imageFile?.mimetype  || ![PNG, JPEG, JPG].includes(coverFile?.mimetype))) {
    //   return res.status(400).json({
    //     status: false,
    //     message: "Upload image type should be jpg, jpeg, png",
    //   });
    // }
    if(imageFile)
    {
      if (![PNG, JPEG, JPG].includes(imageFile?.mimetype)) {
        return res.status(400).json({
          status: false,
          message: "Upload image type should be jpg, jpeg, png a",
        });
      }
    } 
    if(coverFile)
    {
      if ((![PNG, JPEG, JPG].includes(coverFile?.mimetype))) {
        return res.status(400).json({
          status: false,
          message: "Upload image type should be jpg, jpeg, png b",
        });
      }
    }
    
    let image = imageFile ? {image : `${PATH}uploads/${imageFile?.filename}` } : undefined
   
    let cover = coverFile ? {cover : `${PATH}uploads/${coverFile?.filename}` } : undefined
   

    const updateUser = await User.findByIdAndUpdate(req.params.id, {$set :{ ...req.body, ...image , ...cover ,profileComplete}},{new : true});
    
    return res.status(200).json({ status: true, message: "User profile updated successfully" ,user: updateUser})

})