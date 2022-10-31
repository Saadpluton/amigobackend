import mongoose from "mongoose";

const sharesSchema = new mongoose.Schema({
  likes: {
    type : Boolean,
  },
  userId :{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User" ,
    required : [true ,"userId field is required"]
  },
  artistId :{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist" ,
    required : [true ,"userId field is required"]
  },
});

export const Shares =  mongoose.model("Share", sharesSchema)
