import mongoose from "mongoose";
import Joi from "joi";

import JoiObjectId from "joi-objectid";
const mongoonse_id = JoiObjectId(Joi);

const PlaylistSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "userId field is required"]
  },
  trackId: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Song",
  },
  artistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist",
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
  trackGenre: {
    type: String,
  },
  trackSubGenre: [{
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
    title: Joi.string().required(),
    userId: Joi.string().required(),
    description: Joi.string(),
    trackId: Joi.array().items(mongoonse_id()),
    artistId: Joi.string(),
    privacy: Joi.boolean(),
  });

  return schema.validate(user);
}

const Playlist = mongoose.model("Playlist", PlaylistSchema)

export { Playlist, validatePlaylist as validate }


