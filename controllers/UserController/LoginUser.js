import {User , validate} from "#models/UserModel/user"
import asyncHandler from "#middlewares/asyncHandler";
import bcrypt from "bcrypt";
import Joi from "joi";

//@desc Login User
//@route  /user/login
//@request post Request
//@acess  public



export const loginUser = asyncHandler(async (req, res) => {
    
    const validate = (req) => {
        const schema = Joi.object({
          email: Joi.string().min(5).max(255).required().email(),
          password: Joi.string().min(5).max(255).required()
        });
      
        return schema.validate(req)
      }

      const {error} = validate(req.body);

      if (error)
      {
        return res.status(400).send({status : false , message : error?.details[0]?.message});
      }
      
    const userFind = await User.findOne({ email: req.body.email });

    if (!userFind) {
        return res.status(400).json({ status: false, message: "User does not exists!" })
    }

    let valid;
    if (userFind) {
        valid = await bcrypt.compare(req.body.password, userFind.password)
    }
    if (!valid) {
        return res.status(400).json({ status: false, message: "Password Incorrect!" })
    }
    const token = userFind.generateAuthToken();
  if(valid)
  {

    return res.status(200)
    .send({ status: true, message: "User login successfully" ,user : userFind ,token})
       
  }

});
