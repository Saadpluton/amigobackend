import express from "express";
import {multerUpload} from "#utils/multer";

import validateObjectId from "#middlewares/validateObjectId";

import { getPerformOnSong } from "#controllers/PerformsOnSongController/GetPerformOnSong";
import { getOnePerformOnSong } from "#controllers/PerformsOnSongController/GetOnePerformOnSong";
import { createPerformOnSong } from "#controllers/PerformsOnSongController/CreatePerformOnSong";
import { updatePerformOnSong } from "#controllers/PerformsOnSongController/updatePerformOnSong";

const PerformOnSongRoute = express.Router();

// //Create PerformOnSong
PerformOnSongRoute.post("/performOnSong",createPerformOnSong);

// //GET All PerformOnSong
PerformOnSongRoute.get("/performOnSong",getPerformOnSong );

// // //GET One PerformOnSong
PerformOnSongRoute.get("/performOnSong/:id",validateObjectId, getOnePerformOnSong);

// // // //PerformOnSong Updated
PerformOnSongRoute.put("/performOnSong/update/:id",multerUpload.single("image") ,validateObjectId,updatePerformOnSong);

export default PerformOnSongRoute;
