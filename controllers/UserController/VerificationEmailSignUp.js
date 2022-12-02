import { User, validate } from "#models/UserModel/user"
import { UserVerification } from "#models/UserModel/userVerification"
import asyncHandler from "#middlewares/asyncHandler";


//@desc  Verify Email
//@route  /user/verified
//@request Post Request
//@acess  public

export const verifyEmailSignUp = asyncHandler(async (req, res) => {


    let { id, resetId } = req.params;
    const checkedvalid = await UserVerification.findOne({ _id: id, resetId: resetId })

    if (checkedvalid) {
         res.redirect(`https://amigosound.com/create-password?email=${checkedvalid?.email}&role=${checkedvalid?.role}&resetId=${resetId}`)

        //res.redirect(`http://localhost:3000/create-password?email=${checkedvalid?.email}&role=${checkedvalid?.role}&resetId=${resetId}`)
    }
    else {
        return res.status(404).json({ status: false, message: "Link Expired" })
    }
})