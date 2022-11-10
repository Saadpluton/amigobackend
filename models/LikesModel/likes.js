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
  trackId :{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Song" ,
    //required : [true ,"artistId field is required"]
  },
  playlistId :{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Playlist" ,
    //required : [true ,"artistId field is required"]
  },
  artistCommentId :{
    type: mongoose.Schema.Types.ObjectId,
    ref: "artistcomment" ,
    //required : [true ,"artistId field is required"]
  },
  playlistCommentId :{
    type: mongoose.Schema.Types.ObjectId,
    ref: "playlistcomment" ,
    //required : [true ,"artistId field is required"]
  },
  createdAt :{
    type : Date,
    default : Date.now()
  }
});

export const Likes =  mongoose.model("Like", likesSchema)
