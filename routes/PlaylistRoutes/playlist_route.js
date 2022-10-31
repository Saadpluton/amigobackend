import express from "express";
import {multerUpload} from "#utils/multer";

import validateObjectId from "#middlewares/validateObjectId";

import { createPlaylist } from "#controllers/PlaylistController/CreatePlaylist";
import { getPlaylists } from "#controllers/PlaylistController/GetPlaylist";
import { getOnePlaylist } from "#controllers/PlaylistController/GetOnePlaylist";
import { updatePlaylist } from "#controllers/PlaylistController/updatePlaylist";


const PlaylistRoute = express.Router();

// //Create Playlist
PlaylistRoute.post("/playlist",multerUpload.single("image"),createPlaylist);

// // //GET All Playlist
PlaylistRoute.get("/playlist",getPlaylists );

// // //GET One Playlist
PlaylistRoute.get("/playlist/:id",validateObjectId, getOnePlaylist);

// // // //Playlist Updated
PlaylistRoute.put("/playlist/update/:id",multerUpload.single("image") ,validateObjectId,updatePlaylist);

export default PlaylistRoute;
