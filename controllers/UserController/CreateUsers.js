import {User , validate} from "#models/UserModel/user"
import bcrypt from "bcrypt";
import _ from "lodash";
import asyncHandler from "#middlewares/asyncHandler";
import { PATH } from "#constant/constant";
//@desc  User Create
//@route  /user
//@request Post Request
//@acess  public

export const createUser = asyncHandler(async (req, res) => {

  const obj = JSON.parse(JSON.stringify(req.body));

   console.log(obj)
    // const {error} = validate(req.body);

    // if (error)
    // {
    //   return res.status(400).send({status : false , message : error?.details[0]?.message});
    // }

    const emailExists = await User.findOne({ role : req.body.role , email : req.body.email});
    
    if(emailExists)
    {
        return res.status(409).json({ status: false , message: "Email already exist" })    
    }

    let customer = new User(obj)
    const salt = bcrypt.genSalt(10)
    customer.password = await bcrypt.hash(customer.password, parseInt(salt));
    if(req.file?.filename)
    {
      customer.image = `${PATH}uploads/${req.file?.filename}`
    }
    customer = await customer.save();
    res.status(201).json({ status: true, message: "User registered successfully" })

  })
  