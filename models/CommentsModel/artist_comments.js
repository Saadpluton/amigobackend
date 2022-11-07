import mongoose from "mongoose";

const artistCommentsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "userId field is required"]
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "artistcomment",
    //required: [true, "userId field is required"]
  },
  artistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist",
  },
  comments: {
    type: String
  },
  totalLikes : {
    type: Number,
    default : 0
  },
  createAt: {
    type: Date,
    default: Date.now()
  }
});

export const ArtistComments = mongoose.model("artistcomment", artistCommentsSchema)
