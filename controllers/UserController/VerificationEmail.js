import { User, validate } from "#models/UserModel/user"
import { UserVerification } from "#models/UserModel/userVerification"
import asyncHandler from "#middlewares/asyncHandler";


//@desc  Verify Email
//@route  /user/verified
//@request Post Request
//@acess  public

export const verifyEmail = asyncHandler(async (req, res) => {

    let { id, resetId } = req.params;
    const checkedvalid = await UserVerification.findOne({ _id: id, resetId: resetId })

    if (checkedvalid) {
        res.redirect(`http://localhost:5000/updatePassword?email=${checkedvalid.email}&resetId=${resetId}`)
    }
    else {
        return res.status(404).json({ status: true, message: "Failed To Verified" })
    }
})