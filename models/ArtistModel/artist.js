import mongoose from "mongoose";
import Joi from "joi";
import { getEnv } from "../../utils/env.js";
import jwt from "jsonwebtoken";

const ArtistSchema = new mongoose.Schema({
  type : {
    type: String,
    default:"Artist"
   },
  email: {
    type: String,
    /*validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Please enter a valid email",
    },
    required: [true, "email field is required"],*/
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 255,
    // required: [true, "password field is required"],
  },
  name: {
    type: String,
  },
  country: {
    type: String,
  },
  address: String,
  description: {
    type: String,
  },
  totalLikes: {
    type: Number,
    default: 0,
  },
  totalComments: {
    type: Number,
    default: 0,
  },
  totalShares: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
  },
  cover: {
    type: String,
  },
  isSuspend: {
    type: Boolean,
    default: false,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  genre: [
    {
      type: String,
      required: true,
    },
  ],
  role: {
    type: String,
    enum: ["artist"],
    default: "artist",
  },
  gender:{
    type : String,
  },
  profileComplete :{
    type: Number,
    default : 0
  },
  url:{
    type: String,
  },
  isLiked :{
    type : Boolean,
    default : false
  },
  trackId: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Song",
  },
  createdAt :{
    type : Date,
    default : Date.now()
  }
});
ArtistSchema.methods.generateAuthToken = function () {
  const payload = { _id: this._id, name: this.name, email: this.email };
  const secret = getEnv("JWT_SECRET");
  const options = { expiresIn: "1d" };
  return jwt.sign(payload, secret, options);
};

function validateArtist(user) {
  const schema = Joi.object({
    name: Joi.string(),
    url: Joi.string(),
    country: Joi.string(),
    description: Joi.string().min(5).max(100),
    gender: Joi.string(),
    image: Joi.string(),
    cover: Joi.string(),
    genre: Joi.array(),
    role: Joi.string(),
    email: Joi.string().required().email(),
    password: Joi.string().min(8).max(255).required(),
  });

  return schema.validate(user);
}

const Artist = mongoose.model("Artist", ArtistSchema);

export { Artist, validateArtist as validate };
