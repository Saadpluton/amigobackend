import {User , validate} from "#models/UserModel/user"
import {UserVerification} from "#models/UserModel/userVerification"
import asyncHandler from "#middlewares/asyncHandler";
import otpGenerator from 'otp-generator';
import nodemailer from "nodemailer";
import { Artist } from "#models/ArtistModel/artist";

//@desc  forget User Password
//@route  /user/forget
//@request Post Request
//@acess  public

export const forgetPassword = asyncHandler(async (req, res) => {

    let userFind ;
   
    if (req.body.role === "user" ) {
        userFind = await User.findOne({ role : req.body?.role, email: req.body?.email });

      }
       else if (req.body.role === "artist") {
        userFind = await Artist.findOne({role : req.body?.role, email: req.body?.email });
      } 
      else {
        return res
          .status(400)
          .json({ status: true, message: "Role is not valid!" });
      }
    
      if (!userFind) {
        return res
          .status(400)
          .json({ status: true, message: "Email does not exists!" });
      }
   
    const checkedReset = await UserVerification.findOne({email:req.body.email});

    if(checkedReset)
    {
        return res.status(403).json({status : true , message : "Email Verification Sent Already"})
    }

   

    let uniqueString = otpGenerator.generate(6, {
        digits: true, upperCaseAlphabets: false, lowerCaseAlphabets: true, specialChars: false
    })

    let currentUrl = "https://amigobackend.herokuapp.com/";
    
    //let currentUrl = "http://localhost:5000/";
    
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
        html : `<p>Verify your email address to forget the password</p><p>This link 
        <b>expires in 5 minutes</b></p><p>Press <a href=${currentUrl + "api/user/verify/" +verification._id +"/"+ uniqueString}>here </a>to proceed </p>`,
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
    
    return res.status(200).json({status : true , message : "Email Verification Sent"})
    
});
