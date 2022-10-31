import express from "express";

import validateObjectId from "#middlewares/validateObjectId";
import {multerUpload} from "#utils/multer";

import { createUser } from "#controllers/UserController/CreateUsers";
import { getOneUser } from "#controllers/UserController/GetOneUser";
import { getUsers } from "#controllers/UserController/GetUsers";
import { loginUser } from "#controllers/UserController/LoginUser";
import { suspendUser } from "#controllers/UserController/suspendUser";
import { forgetPassword } from "#controllers/UserController/forgetPassword";
import { verifyEmail } from "#controllers/UserController/VerificationEmail";
import { updatePassword } from "#controllers/UserController/updatePassword";
import { updateProfile } from "#controllers/UserController/updateUserProfile";


const userRoute = express.Router();

//Create Users
userRoute.post("/user",multerUpload.single("image"),createUser);

//GET All Users
userRoute.get("/user",getUsers );

//GET One User
userRoute.get("/user/:id",validateObjectId, getOneUser);

//Suspend User
userRoute.put("/user/suspend/:id",validateObjectId, suspendUser);

//Login User
userRoute.post("/user/login", loginUser);

//Forget Password
userRoute.post("/user/forget", forgetPassword);

//Verify Email
userRoute.get("/user/verify/:id/:resetId",verifyEmail);

//Verifed Email and Password Updated
userRoute.get("/user/verifed/",verifyEmail);

//Password Updated
userRoute.post("/user/update",updatePassword);

//Profile Updated
userRoute.put("/user/update/:id",validateObjectId ,multerUpload.single("image"),updateProfile);

export default userRoute;
