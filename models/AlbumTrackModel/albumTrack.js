import mongoose from "mongoose";
import Joi from "joi";

const AlbumTrackSchema = new mongoose.Schema({

      albumId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Album" ,
        required : [true ,"albumId field is required"]
      },
      songId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song" ,
        required : [true ,"songId field is required"]
      },
});

function validateAlbumTrack(user) {
    const schema = Joi.object({
        albumId: Joi.string()
        .required(),
        songId: Joi.string()
        .required(),
    });
  
    return schema.validate(user);
  }

const AlbumTrack =  mongoose.model("AlbumTrack", AlbumTrackSchema)

export {AlbumTrack, validateAlbumTrack as validate}


