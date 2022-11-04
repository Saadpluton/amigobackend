import mongoose from "mongoose";

const listenerSchema = new mongoose.Schema({
  userId :{
  type : String
  },
  // artistId :{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Artist" ,
  // },
  // albumId :{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Album" ,
  //   //required : [true ,"artistId field is required"]
  // },
  trackId :{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Song" ,
    //required : [true ,"artistId field is required"]
  },
  playlistId :{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Playlist" ,
    //required : [true ,"artistId field is required"]
  }
});

export const Listener =  mongoose.model("Listener", listenerSchema)
