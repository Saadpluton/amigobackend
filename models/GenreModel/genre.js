import Joi from "joi";
import mongoose from "mongoose";

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  createdAt :{
    type : Date,
    default : Date.now()
  },
  isSuspend: {
    type: Boolean,
    default: false,
  },
});

const Genre = mongoose.model("Genre", genreSchema);

const validateGenre = (genre) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string(),
  });

  return schema.validate(genre);
};

export { genreSchema, Genre, validateGenre as validate };
