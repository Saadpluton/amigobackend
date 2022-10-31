import mongoose from "mongoose";
import Joi from "joi";

const ArtistSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: [true, "name field is required"],
  },
  country: {
    type: String,
    required: [true, "country field is required"],
  },
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: [true, "accountId field is required"],
  },
  image: {
    type: String,
  },
  isSuspend: {
    type: Boolean,
    default: false,
  },
});

function validateArtist(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    country: Joi.string().required(),
    accountId: Joi.string().required(),
  });

  return schema.validate(user);
}

const Artist = mongoose.model("Artist", ArtistSchema);

export { Artist, validateArtist as validate };
