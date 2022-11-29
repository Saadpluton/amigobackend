import mongoose from "mongoose";
import Joi from "joi";

const SongSchema = new mongoose.Schema({
  type : {
    type: String,
    default:"Track"
   },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  duration: {
    type: String,
  },
  genre: {
    type: String,
  },
  image: {
    type: String,
  },
  artistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  artistName: {
    type: String,
  },
  year: {
    type: String,
  },
  totalListeners: {
    type: Number,
    default: 0,
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
  audio: {
    type: String,
  },
  isSuspend: {
    type: Boolean,
    default: false,
  },
  isViewed: {
    type: Boolean,
    default: false,
  },
  isLiked: {
    type: Boolean,
    default: false,
  },
  isTrending: {
    type: Boolean,
    default: false,
  },
  createdAt :{
    type : Date,
    default : Date.now()
  }
});

function validateSong(user) {
  const schema = Joi.object({
    name: Joi.string().required(),
    //tag: Joi.string().required(),
    description: Joi.string().required(),
    duration: Joi.string(),
    genre: Joi.string().required(),
    image: Joi.string(),
    audio: Joi.string(),
    artistId: Joi.string(),
    userId: Joi.string(),
    artistName: Joi.string(),
  });
  return schema.validate(user);
}

const Song = mongoose.model("Song", SongSchema);

export { Song, validateSong as validate };
