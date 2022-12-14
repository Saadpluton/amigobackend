import express from "express";
import {multerUpload} from "#utils/multer";

import validateObjectId from "#middlewares/validateObjectId";

import { createPlaylist } from "#controllers/PlaylistController/CreatePlaylist";
import { getPlaylists } from "#controllers/PlaylistController/GetPlaylist";
import { getOnePlaylist } from "#controllers/PlaylistController/GetOnePlaylist";
import { updatePlaylist } from "#controllers/PlaylistController/updatePlaylist";
import { addTrackPlaylist } from "#controllers/PlaylistController/AddTrackInPlaylist";
import { getPlaylistTrack } from "#controllers/PlaylistController/GetPlaylisTrack";
import { getPlaylistsByUserId } from "#controllers/PlaylistController/getPlaylistBuUserId";
import { suspendPlaylist } from "#controllers/PlaylistController/suspendPlaylist";
import { deletePlaylistTrack } from "#controllers/PlaylistController/DeletePlaylistTrack";
import { weeklyGetPlaylist } from "#controllers/PlaylistController/WeeklyGetPlaylist";
import {getTrendingPlaylists} from "#controllers/PlaylistController/GetTrendingPlaylist";


const PlaylistRoute = express.Router();

// //Create Playlist
PlaylistRoute.post("/playlist",multerUpload.single("image"),createPlaylist);

// // //GET All Playlist
PlaylistRoute.get("/playlist",getPlaylists );

// // //GET All Playlist
PlaylistRoute.get("/playlist/trending",getTrendingPlaylists);

// // //Add Track Playlist
PlaylistRoute.post("/addtrackplaylist",addTrackPlaylist );

// // //GET One Playlist
PlaylistRoute.get("/playlist/:id",validateObjectId, getOnePlaylist);

// // //GET One Playlist
PlaylistRoute.get("/playlistTrack", getPlaylistTrack);

// // //GET One Playlist
PlaylistRoute.get("/playlistUser", getPlaylistsByUserId);

// // //GET Weekly Playlist
PlaylistRoute.get("/weeklPlaylist", weeklyGetPlaylist);

// // // //Playlist Updated
PlaylistRoute.put("/playlist/update/:id",multerUpload.single("image") ,validateObjectId,updatePlaylist);
// // //Suspend Playlist
PlaylistRoute.put("/playlist/suspend/:id", validateObjectId, suspendPlaylist);

// //delete Track In playlist
PlaylistRoute.delete("/playlist/delete/:id",validateObjectId, deletePlaylistTrack);

export default PlaylistRoute;
