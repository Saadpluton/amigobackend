import mongoose from "mongoose";
import Joi from "joi";

const PerformOnSongSchema = new mongoose.Schema({

      songId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song" ,
        required : [true ,"songId field is required"]
      },
      artistId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artist" ,
        required : [true ,"artistId field is required"]
      },

});

function validatePerformOnSong(user) {
    const schema = Joi.object({
        songId: Joi.string()
        .required(),
        artistId: Joi.string()
        .required(),
    });
  
    return schema.validate(user);
  }

const PerformOnSong =  mongoose.model("PerformOnSong", PerformOnSongSchema)

export {PerformOnSong, validatePerformOnSong as validate}


