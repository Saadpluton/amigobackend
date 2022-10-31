import mongoose from "mongoose";
import Joi from "joi";

const FollowSchema = new mongoose.Schema({

      userId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" ,
        required : [true ,"userId field is required"]
      },
      artistId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artist" ,
        required : [true ,"artistId field is required"]
      },

});

function validateFollow(user) {
    const schema = Joi.object({
        userId: Joi.string()
        .required(),
        artistId: Joi.string()
        .required(),
    });
  
    return schema.validate(user);
  }

const Follow =  mongoose.model("Follow", FollowSchema)

export {Follow, validateFollow as validate}


