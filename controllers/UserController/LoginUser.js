import { User, validate } from "#models/UserModel/user";
import asyncHandler from "#middlewares/asyncHandler";
import bcrypt from "bcryptjs";
import Joi from "joi";
import { Artist } from "#models/ArtistModel/artist";
import e from "express";
//@desc Login User
//@route  /user/login
//@request post Request
//@acess  public

export const loginUser = asyncHandler(async (req, res) => {
  const validate = (req) => {
    const schema = Joi.object({
      email: Joi.string().required().email(),
      password: Joi.string().min(8).max(255).required(),
      role: Joi.string().required(),
    });

    return schema.validate(req);
  };

  const { error } = validate(req.body);

  if (error) {
    return res
      .status(400)
      .send({ status: false, message: error?.details[0]?.message });
  }

  let userFind, token;

  if (req.body.role === "user" || req.body.role === "admin" ) {
    userFind = await User.findOne({ role : req.body?.role, email: req.body?.email });
    token = userFind?.generateAuthToken();
  } else if (req.body.role === "artist") {
    userFind = await Artist.findOne({role : req.body?.role, email: req.body?.email });
    token = userFind?.generateAuthToken();
  } else {
    return res
      .status(400)
      .json({ status: true, message: "Role is not valid!" });
  }

  if (!userFind) {
    return res
      .status(400)
      .json({ status: true, message: "Email or password incorrect!" });
  }

  let valid;
  if (userFind) {
    valid = await bcrypt.compare(req.body?.password, userFind?.password);
  }
  if (!valid) {
    return res
      .status(400)
      .json({ status: true, message: "Email or password incorrect!" });
  }
  if(userFind.isSuspend === true){
    return res
      .status(400)
      .json({ status: true, message: "You status is suspend!"});
  
  }
  if (valid) {
    return res
      .status(200)
      .send({
        status: true,
        message: "login successfully",
        user: userFind,
        token,
      });
  }
});
