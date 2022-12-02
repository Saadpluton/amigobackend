import mongoose from "mongoose";

const playlistCommentsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "userId field is required"]
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "playlistcomment",
    //required: [true, "userId field is required"]
  },
  name : {
    type : String,
  },
  image : {
    type : String,
  },
  playlistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Playlist",
  },
  comments: {
    type: String
  },
  createAt: {
    type: Date,
    default: Date.now()
  }
});

export const PlaylistComments = mongoose.model("playlistcomment", playlistCommentsSchema)
