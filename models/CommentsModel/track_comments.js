import mongoose from "mongoose";

const trackCommentsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "userId field is required"]
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TrackComment",
    //required: [true, "userId field is required"]
  },
  name : {
    type : String,
  },
  image : {
    type : String,
  },
  trackId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Song",
    //required : [true ,"artistId field is required"]
  },
  comments: {
    type: String
  },
},{timestamps : true});

export const TrackComments = mongoose.model("TrackComment", trackCommentsSchema)
