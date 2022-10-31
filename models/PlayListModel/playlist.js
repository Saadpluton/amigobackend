import mongoose from "mongoose";
import Joi from "joi";

const PlaylistSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title field is required"]
  },
  description:{
    type: String,
    required: [true, "description field is required"]
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "userId field is required"]
  },
  trackId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Song",
    required: [true, "userId field is required"]
  },
  artistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist",
    required: [true, "artistId field is required"]
  },
  artistName: {
    type: String,
  },
  trackName: {
    type: String,
  },
  trackTitle: {
    type: String,
  },
  trackDuration: {
    type: String,
  },
  trackGenre: [{
    type: String
  }],
  image: {
    type: String,
  },
  privacy: {
    type: Boolean,
    default: false
  }
});

function validatePlaylist(user) {
  const schema = Joi.object({
    title: Joi.string()
      .required(),
    userId: Joi.string()
      .required(),
      description :Joi.string()
      .required(),
      trackId :Joi.string()
      .required(),
      artistId :Joi.string()
      .required(),
 
    });

  return schema.validate(user);
}

const Playlist = mongoose.model("Playlist", PlaylistSchema)

export { Playlist, validatePlaylist as validate }


