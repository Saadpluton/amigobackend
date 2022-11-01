import mongoose from "mongoose";

const artistCommentsSchema = new mongoose.Schema({
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
  comments: {
    type: String
  },
  createAt: {
    type: Date,
    default: Date.now()
  }
});

export const ArtistComments = mongoose.model("ArtistComment", artistCommentsSchema)
