import express from "express";
import {multerUpload} from "#utils/multer";

import validateObjectId from "#middlewares/validateObjectId";

import { createAlbum } from "#controllers/AlbumController/CreateAlbum";
import { getAlbums } from "#controllers/AlbumController/GetAlbum";
import { getOneAlbum } from "#controllers/AlbumController/GetOneAlbum";
import { updateAlbum } from "#controllers/AlbumController/updateAlbum";
import { suspendAlbum } from "#controllers/AlbumController/suspendAlbum";
import { getArtistAlbum } from "#controllers/AlbumController/getArtistAlbum";


const albumRoute = express.Router();

// //Create album
albumRoute.post("/album",multerUpload.single("image"),createAlbum);

// //GET All album
albumRoute.get("/album",getAlbums );

// // //GET One album
albumRoute.get("/album/:id",validateObjectId, getOneAlbum);

// // //album Updated
albumRoute.put("/album/update/:id",multerUpload.single("image") ,validateObjectId,updateAlbum);

// // //Suspend album
albumRoute.put("/album/suspend/:id",validateObjectId, suspendAlbum);

// // //GET Artist album
albumRoute.get("/artistAlbum", getArtistAlbum);

export default albumRoute;
