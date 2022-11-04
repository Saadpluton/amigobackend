import mongoose from "mongoose";
import Joi from "joi";

const ArtistSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: [true, "name field is required"],
  },
  gender :{
    type : String,
    required: [true, "gender field is required"],
  },
  country: {
    type: String,
    required: [true, "country field is required"],
  },
  description:{
    type: String,
    required: [true, "description field is required"],   
  },
  totalLikes: {
    type: Number,
    default: 0
  },
  totalComments: {
    type: Number,
    default: 0
  },
  totalShares: {
    type: Number,
    default: 0
  },
  image: {
    type: String,
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

function validateArtist(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    country: Joi.string().required(),
    description: Joi.string().required(),
    gender: Joi.string(),
    image: Joi.string(),
  });

  return schema.validate(user);
}

const Artist = mongoose.model("Artist", ArtistSchema);

export { Artist, validateArtist as validate };
