import mongoose from "mongoose";
import Joi from "joi";

import JoiObjectId from "joi-objectid";
const mongoonse_id = JoiObjectId(Joi);

const AlbumSchema = new mongoose.Schema({
 type : {
  type: String,
  default:"Album"
 },
  title: {
    type: String,
    required: [true, "title field is required"],
  },
  genre: {
    type: String
  },
  description: {
    type: String,
  },
  trackId: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Song",
  },
  artistName: {
    type: String,
  },
  artistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist",
    required: [true, "ArtistId field is required"],
  },
  image: {
    type: String,
  },
  totalListeners: {
    type: Number,
    default: 0
  },
  totalLikes: {
    type: Number,
    default: 0,
  },
  totalComments: {
    type: Number,
    default: 0
  },
  totalShares: {
    type: Number,
    default: 0
  },
  isSuspend: {
    type: Boolean,
    default: false,
  },
  isViewed: {
    type: Boolean,
    default: 0
  },
  privacy: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

function validateAlbum(user) {
  const schema = Joi.object({
    title: Joi.string().required(),
    artistId: Joi.string().required(),
    artistName: Joi.string(),
    totalLikes: Joi.number(),
    trackId: Joi.array().items(mongoonse_id()),
    genre: Joi.string(),
    description: Joi.string().max(244),
    privacy: Joi.boolean(),
  });

  return schema.validate(user);
}

const Album = mongoose.model("Album", AlbumSchema);

export { Album, validateAlbum as validate };
