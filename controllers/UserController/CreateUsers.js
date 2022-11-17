import {User , validate} from "#models/UserModel/user"
import bcrypt from "bcrypt";
import _ from "lodash";
import asyncHandler from "#middlewares/asyncHandler";
import { PATH } from "#constant/constant";
import { Artist } from "#models/ArtistModel/artist";
import { UserVerification } from "#models/UserModel/userVerification"

//@desc  User Create
//@route  /user
//@request Post Request
//@acess  public

export const createUser = asyncHandler(async (req, res) => {
 
  const obj = JSON.parse(JSON.stringify(req.body));
 
   const checkedvalid = await UserVerification.findOne({ email: obj.email,role : obj.role ,resetId : obj.resetId})
   if(!checkedvalid)
   {
       return res.status(404).json({status : true , message : "Please verify email!"})        
   }

   let {resetId , ...data} =  obj
 
   const {error} = validate(data);   
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
      customer = new User(data)
      if (!req.body?.name) {
        const name =  req.body?.email.split('@').at(0)
        customer.name = name;
    }
  
      const salt = bcrypt.genSalt(10)
      customer.password = await bcrypt.hash(customer.password, parseInt(salt));
      if(req.file?.filename)
      {
        customer.image = `${PATH}uploads/${req.file?.filename}`
      }

      customer = await customer.save();
      await UserVerification.findOneAndDelete({email : obj.email});  
      return res.status(201).json({ status: true, message: "User registered successfully",user : customer  })
    
    }
  else if(req.body.role === "artist")
   {
    if (emailExistsArtist) {
      return res
        .status(400)
        .json({ status: true, message: "Artist Email already exist" });
    }

    customer = new Artist(data)
    if (!req.body?.name) {
      const name =  req.body?.email.split('@').at(0)
      customer.name = name;
  }
    const salt = bcrypt.genSalt(10)
    customer.password = await bcrypt.hash(customer.password, parseInt(salt));
    
    if(req.file?.filename)
    {
      customer.image = `${PATH}uploads/${req.file?.filename}`
    }
    customer = await customer.save();
    await UserVerification.findOneAndDelete({email : obj.email});
    return res.status(201).json({ status: true, message: "Artist registered successfully" ,user : customer })
   }else {
    return res
      .status(400)
      .json({ status: true, message: "Role is not valid!" });
  }
  })
  