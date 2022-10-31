import mongoose from "mongoose";

const UserVerificationSchema = new mongoose.Schema({

    userId: {
        type: String,
    },
    email: {
        type: String,
    }
    ,
    resetId: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: { expires: 300 }
    },

});

const UserVerification = mongoose.model("UserVerification", UserVerificationSchema)

export { UserVerification }


