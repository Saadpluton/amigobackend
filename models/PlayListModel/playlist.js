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
    type: String
  },
  trackId: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Playlist",
  },
  artistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist",
  },
  totalListeners: {
    type: Number,
    default: 0
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
    userId: Joi.string(),
    description: Joi.string(),
    trackId: Joi.array().items(mongoonse_id()),
    artistId: Joi.string(),
    privacy: Joi.boolean(),
  });

  return schema.validate(user);
}

const Playlist = mongoose.model("Playlist", PlaylistSchema)

export { Playlist, validatePlaylist as validate }


