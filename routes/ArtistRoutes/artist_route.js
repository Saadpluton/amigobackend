import express from "express";
import {multerUpload} from "#utils/multer";

import validateObjectId from "#middlewares/validateObjectId";

import { createArtist } from "#controllers/ArtistController/CreateArtist";
import { getArtists } from "#controllers/ArtistController/GetArtists";
import { getOneArtist } from "#controllers/ArtistController/GetOneArtist";
import { updateArtistProfile } from "#controllers/ArtistController/updateArtistProfile";
import { suspendArtist } from "#controllers/ArtistController/suspendArtist";

const artistRoute = express.Router();

// //Create Artist
artistRoute.post("/artist",multerUpload.single("image"),createArtist);

// //GET All Artist
artistRoute.get("/artist",getArtists );

// //GET One Artist
artistRoute.get("/artist/:id",validateObjectId, getOneArtist);

// //Artist Profile Updated
artistRoute.put("/artist/update/:id",multerUpload.single("image") ,validateObjectId,updateArtistProfile);

// //Suspend Artist
artistRoute.put("/artist/suspend/:id",validateObjectId, suspendArtist);


export default artistRoute;
