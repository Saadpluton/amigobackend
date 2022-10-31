import express from "express";
import {multerUpload} from "#utils/multer";

import validateObjectId from "#middlewares/validateObjectId";
import { getAlbumsTrack } from "#controllers/AlbumTrackController/GetAlbumTrack";
import { getOneAlbumTrack } from "#controllers/AlbumTrackController/GetOneAlbumTrack";
import { createAlbumTrack } from "#controllers/AlbumTrackController/CreateAlbumTrack";
import { updateAlbumTrack } from "#controllers/AlbumTrackController/updateAlbum";

const albumTrackRoute = express.Router();

// //Create albumTrack
albumTrackRoute.post("/albumTrack",createAlbumTrack);

// //GET All albumTrack
albumTrackRoute.get("/albumTrack",getAlbumsTrack );

// // //GET One albumTrack
albumTrackRoute.get("/albumTrack/:id",validateObjectId, getOneAlbumTrack);

// // // //albumTrack Updated
albumTrackRoute.put("/albumTrack/update/:id",multerUpload.single("image") ,validateObjectId,updateAlbumTrack);

export default albumTrackRoute;
