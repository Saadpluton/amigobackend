import mongoose from "mongoose";

const UserVerificationSchema = new mongoose.Schema({

    userId: {
        type: String,
    },
    email: {
        type: String,
    },
    role : {
        type: String,
        enum : ["user","artist"],
    },
    resetId: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: { expires: 300 }
    },

});

function validateUserVerification(user) {
    const schema = Joi.object({
        email: Joi.string()
        .required()
        .email(),
         role: Joi.string().required(),
    });
  
    return schema.validate(user);
  }
  
  const UserVerification = mongoose.model("UserVerification", UserVerificationSchema)

  export { UserVerification, validateUserVerification as validate }
  


