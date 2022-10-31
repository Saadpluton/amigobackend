import mongoose from "mongoose";
import Joi from "joi";

const PlaylistSchema = new mongoose.Schema({

        
    title :{
        type : String ,
        required : [true ,"title field is required"]
      },
    userId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" ,
        required : [true ,"userId field is required"]
      },
      image : {
        type: String,
      },

});

function validatePlaylist(user) {
    const schema = Joi.object({
        title: Joi.string()
        .required(),
        userId: Joi.string()
        .required(),
    });
  
    return schema.validate(user);
  }

const Playlist =  mongoose.model("Playlist", PlaylistSchema)

export {Playlist, validatePlaylist as validate}


