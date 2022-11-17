import {User , validate} from "#models/UserModel/user"
import {UserVerification} from "#models/UserModel/userVerification"
import asyncHandler from "#middlewares/asyncHandler";
import otpGenerator from 'otp-generator';
import nodemailer from "nodemailer";

//@desc  forget User Password
//@route  /user/forget
//@request Post Request
//@acess  public

export const createSignUp = asyncHandler(async (req, res) => {
     
    
    const emailValid = await User.findOne({email:req.body.email})

    const checkedReset = await UserVerification.findOne({email:req.body.email});

    if(checkedReset)
    {
        return res.status(200).json({status : true , message : "Email Verification Sent Already"})
    }

    if(emailValid)
    {
        return res.status(404).json({status : true , message : "email already exists"})
    }
    let uniqueString = otpGenerator.generate(6, {
        digits: true, upperCaseAlphabets: false, lowerCaseAlphabets: true, specialChars: false
    })

    let currentUrl = "http://localhost:5000/";
    
    let verification = new UserVerification({
        //userId: emailValid._id,
        role : req.body.role,
        email : req.body.email,
        resetId: uniqueString,
        
    })
    verification = await verification.save();

    const mailOptions = {
        from: "sk5908774@gmail.com",
        to: req.body.email,
        subject: "Verify Your Email",
        html : `<p>Verify your email address to create a account</p><p>This link 
        <b>expires in 5 minutes</b></p><p>Press <a href=${currentUrl + "api/user/create/verify/" +verification._id +"/"+ uniqueString}>here </a>to proceed </p>`,
    }
    let transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "sk5908774@gmail.com",
            pass: "otwduudpsiaonjaz"
        }
    });
    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
        }
    })
    
    return res.status(200).json({status : true , message : "Email Verification Sent To Your Account!"})
    
});
