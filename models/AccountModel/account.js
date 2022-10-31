import mongoose from "mongoose";
import Joi from "joi";

const AccountSchema = new mongoose.Schema({
    
    email : {
        type : String ,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
        required: [true, "Email field is required"],
    },
});

function validateAccount(user) {
    const schema = Joi.object({
        email: Joi.string()
        .required().email(),
    });
  
    return schema.validate(user);
  }

const Account =  mongoose.model("Account", AccountSchema)

export {Account, validateAccount as validate}


