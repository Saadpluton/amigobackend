import express from "express";
import {multerUpload} from "#utils/multer";

import validateObjectId from "#middlewares/validateObjectId";

import { createPlaylistTrack } from "#controllers/PlaylistTrackController/CreatePlaylistTrack";
import { getOnePlaylistTrack } from "#controllers/PlaylistTrackController/GetOnePlaylistTrack";
import { getPlaylistTracks } from "#controllers/PlaylistTrackController/GetPlaylistTrack";
import { updatePlaylistTrack } from "#controllers/PlaylistTrackController/updatePlaylistTrack";


const PlaylistTrackRoute = express.Router();

// //Create PlaylistTrack
PlaylistTrackRoute.post("/playlistTrack",multerUpload.single("image"),createPlaylistTrack);

// // //GET All PlaylistTrack
PlaylistTrackRoute.get("/playlistTrack",getPlaylistTracks );

// // //GET One PlaylistTrack
PlaylistTrackRoute.get("/playlistTrack/:id",validateObjectId, getOnePlaylistTrack);

// // // //PlaylistTrack Updated
PlaylistTrackRoute.put("/playlistTrack/update/:id",multerUpload.single("image") ,validateObjectId,updatePlaylistTrack);

export default PlaylistTrackRoute;
