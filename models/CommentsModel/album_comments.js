import mongoose from "mongoose";

const albumCommentsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "userId field is required"]
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "albumcomment",
    //required: [true, "userId field is required"]
  },
  albumId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Album",
  },
  name : {
    type : String,
  },
  image : {
    type : String,
  },
  comments: {
    type: String
  },
  totalLikes : {
    type: Number,
    default : 0
  },
},{timestamps : true});

export const AlbumComments = mongoose.model("albumcomments", albumCommentsSchema)
