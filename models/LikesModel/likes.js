import mongoose from "mongoose";

const likesSchema = new mongoose.Schema({
  userId :{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User" ,
    required : [true ,"userId field is required"]
  },
  artistId :{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist" ,
  },
  albumId :{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Album" ,
    //required : [true ,"artistId field is required"]
  },
  songId :{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Song" ,
    //required : [true ,"artistId field is required"]
  },
});

export const Likes =  mongoose.model("Like", likesSchema)
