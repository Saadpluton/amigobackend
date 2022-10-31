import mongoose from "mongoose";
import Joi from "joi";

const PlaylistTrackSchema = new mongoose.Schema({

  playlistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Playlist",
    required: [true, "playlistId field is required"]
  },
  trackId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AlbumTrack",
    required: [true, "trackId field is required"]
  },
  songId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Song",
    required: [true, "songId field is required"]
  },

});

function validatePlaylistTrack(user) {
  const schema = Joi.object({
    playlistId: Joi.string()
      .required(),
    trackId: Joi.string()
      .required(),
    songId: Joi.string()
      .required(),
  });

  return schema.validate(user);
}

const PlaylistTrack = mongoose.model("PlaylistTrack", PlaylistTrackSchema)

export { PlaylistTrack, validatePlaylistTrack as validate }


