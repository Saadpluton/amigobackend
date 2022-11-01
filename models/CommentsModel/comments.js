import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "userId field is required"]
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comments",
    //required: [true, "userId field is required"]
  },

  artistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist",
  },
  albumId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Album",
    //required : [true ,"artistId field is required"]
  },
  trackId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Song",
    //required : [true ,"artistId field is required"]
  },
  playlistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Playlist",
    //required : [true ,"playlistId field is required"]
  },
  comments: {
    type: String
  },
  createAt: {
    type: Date,
    default: Date.now()
  }
});

export const Comments = mongoose.model("Comment", commentsSchema)
