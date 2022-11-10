import Joi from "joi";
import mongoose from "mongoose";

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subGenre: [
    {
      type: String,
      required: true,
    },
  ],
  image: {
    type: String,
  },
  createdAt :{
    type : Date,
    default : Date.now()
  }
});

const Genre = mongoose.model("Genre", genreSchema);

const validateGenre = (genre) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    subGenre: Joi.array(),
    image: Joi.string(),
  });

  return schema.validate(genre);
};

export { genreSchema, Genre, validateGenre as validate };
