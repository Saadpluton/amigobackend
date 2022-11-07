import {User , validate} from "#models/UserModel/user"
import bcrypt from "bcrypt";
import _ from "lodash";
import asyncHandler from "#middlewares/asyncHandler";
import { PATH } from "#constant/constant";
import { Artist } from "#models/ArtistModel/artist";
//@desc  User Create
//@route  /user
//@request Post Request
//@acess  public

export const createUser = asyncHandler(async (req, res) => {

  const obj = JSON.parse(JSON.stringify(req.body));

   console.log(obj)
    const {error} = validate(req.body);

    if (error)
    {
      return res.status(400).send({status : false , message : error?.details[0]?.message});
    }

    const emailExistsArtist = await Artist.findOne({role : req.body.role, email: req.body.email }); 
    const emailExistsUser = await User.findOne({ role : req.body.role , email : req.body.email});
    
   
let customer ;
    if(req.body.role === "user")
    {
      if(emailExistsUser)
      {
          return res.status(400).json({ status: true , message: "User Email already exist" })    
      }
      customer = new User(obj)
      const salt = bcrypt.genSalt(10)
      customer.password = await bcrypt.hash(customer.password, parseInt(salt));
      if(req.file?.filename)
      {
        customer.image = `${PATH}uploads/${req.file?.filename}`
      }
      customer = await customer.save();
      return res.status(201).json({ status: true, message: "User registered successfully" })    
    }
   if(req.body.role === "artist")
   {
    if (emailExistsArtist) {
      return res
        .status(400)
        .json({ status: true, message: "Artist Email already exist" });
    }
  
    customer = new Artist(obj)
    const salt = bcrypt.genSalt(10)
    customer.password = await bcrypt.hash(customer.password, parseInt(salt));
    
    if(req.file?.filename)
    {
      customer.image = `${PATH}uploads/${req.file?.filename}`
    }
    customer = await customer.save();
    return res.status(201).json({ status: true, message: "Artist registered successfully" })

   }

  })
  