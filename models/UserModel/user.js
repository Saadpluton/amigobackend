import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Joi from "joi";
//import env from "#utils/env";
import { getEnv } from "../../utils/env.js";
const UserSchema = new mongoose.Schema({

  email: {
    type: String,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Please enter a valid email"
    },
    required: [true, "email field is required"],
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: [true, "password field is required"]
  },
  name: {
    type: String,
    minlength: 5,
    maxlength: 50,
  },
  country: {
    type: String,
  },
  role:{
    type : String,
    enum : ["user","admin"],
    required : true
  },
  plan:{
    type : String,
    enum : ["premium","gold","silver"],
  },
  phone:{
    type : Number,
  },
  image : {
    type: String,
  },
  isSuspend: {
    type: Boolean,
    default: false,
  },
  createdAt :{
    type : Date,
    default : Date.now()
  }
});
UserSchema.methods.generateAuthToken = function () {
  const payload = { _id: this._id, name: this.name, email: this.email };
  const secret = getEnv('JWT_SECRET');
  const options = { expiresIn: '1d' }
  return jwt.sign(payload, secret, options);
};

function validateUser(user) {
  const schema = Joi.object({
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
      role: Joi.string(),
      password: Joi.string()
      .min(5)
      .max(255)
      .required(),
  });

  return schema.validate(user);
}

const User = mongoose.model("User", UserSchema)

export { User, validateUser as validate }


