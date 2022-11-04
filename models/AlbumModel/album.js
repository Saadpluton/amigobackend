import mongoose from "mongoose";
import Joi from "joi";

const AlbumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title field is required"],
  },
  genre :[{
   type : String
  }],
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
}
});

function validateAlbum(user) {
  const schema = Joi.object({
    title: Joi.string().required(),
    artistId: Joi.string().required(),
    artistName: Joi.string(),
    totalLikes: Joi.number(),
    genre : Joi.string()
  });

  return schema.validate(user);
}

const Album = mongoose.model("Album", AlbumSchema);

export { Album, validateAlbum as validate };
