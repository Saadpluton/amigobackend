import express from "express";
import validateObjectId from "#middlewares/validateObjectId";

import { createTrendingTrack } from "#controllers/AdminController/CreateTrending Track";
import { getPlaylists } from "#controllers/AdminController/getAllPlaylist";
import { getTracks } from "#controllers/AdminController/getAllTrack";
import { getAlbums } from "#controllers/AdminController/getAllAlbum";
import { getArtist } from "#controllers/AdminController/getAllArtist";


const AdminRoute = express.Router();

// Track Trending Added
AdminRoute.get("/trackTrending/:id",validateObjectId, createTrendingTrack);

// Admin All Playlist
AdminRoute.get("/playlistAdmin", getPlaylists);

// Admin All Track
AdminRoute.get("/trackAdmin", getTracks);

// Admin All Albums
AdminRoute.get("/albumAdmin", getAlbums);

// Admin All Artist
AdminRoute.get("/artistAdmin", getArtist);

export default AdminRoute;
