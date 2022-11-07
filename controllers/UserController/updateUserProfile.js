import { User, validate } from "#models/UserModel/user"
import asyncHandler from "#middlewares/asyncHandler";
import { PATH } from "#constant/constant";

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

    const update = await User.findByIdAndUpdate(req.params.id, {$set :{ ...req.body, image : `${PATH}uploads/${req.file?.filename}`}});
    
    return res.status(200).json({ status: true, message: "User profile updated successfully" })

})