import express from "express";
import {multerUpload} from "#utils/multer";

import validateObjectId from "#middlewares/validateObjectId";

import { createPlaylist } from "#controllers/PlaylistController/CreatePlaylist";
import { getPlaylists } from "#controllers/PlaylistController/GetPlaylist";
import { getOnePlaylist } from "#controllers/PlaylistController/GetOnePlaylist";
import { updatePlaylist } from "#controllers/PlaylistController/updatePlaylist";
import { addTrackPlaylist } from "#controllers/PlaylistController/AddTrackInPlaylist";
import { getPlaylistTrack } from "#controllers/PlaylistController/GetPlaylisTrack";


const PlaylistRoute = express.Router();

// //Create Playlist
PlaylistRoute.post("/playlist",multerUpload.single("image"),createPlaylist);

// // //GET All Playlist
PlaylistRoute.get("/playlist",getPlaylists );

// // //Add Track Playlist
PlaylistRoute.post("/addtrackplaylist",addTrackPlaylist );

// // //GET One Playlist
PlaylistRoute.get("/playlist/:id",validateObjectId, getOnePlaylist);

// // //GET One Playlist
PlaylistRoute.get("/playlistTrack", getPlaylistTrack);

// // // //Playlist Updated
PlaylistRoute.put("/playlist/update/:id",multerUpload.single("image") ,validateObjectId,updatePlaylist);

export default PlaylistRoute;
