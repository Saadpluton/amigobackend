import express from "express";
import validateObjectId from "#middlewares/validateObjectId";
import {multerUpload} from "#utils/multer";

import { createTrendingTrack } from "#controllers/AdminController/CreateTrending Track";
import { getPlaylists } from "#controllers/AdminController/getAllPlaylist";
import { getTracks } from "#controllers/AdminController/getAllTrack";
import { getAlbums } from "#controllers/AdminController/getAllAlbum";
import { getArtist } from "#controllers/AdminController/getAllArtist";
import { getFeatureArtist } from "#controllers/AdminController/getAllFeatureArtist";
import { createFeatureArtist } from "#controllers/AdminController/CreateFeatureArtist";
import { createUserAdminRegistration } from "#controllers/AdminController/createUserRegistration";
import { getPlaylistsAdmin } from "#controllers/AdminController/GetPlayListAdmin";

const AdminRoute = express.Router();

// Track Trending Added
AdminRoute.get("/trackTrending/:id",validateObjectId, createTrendingTrack);

// Admin All Playlist
AdminRoute.get("/playlistAdmin", getPlaylists);

// Admin Personal Playlist
AdminRoute.get("/playlistAdminPersonal/:id",validateObjectId, getPlaylistsAdmin);


// Admin All Track
AdminRoute.get("/trackAdmin", getTracks);

// Admin All Albums
AdminRoute.get("/albumAdmin", getAlbums);

// Admin All Artist
AdminRoute.get("/artistAdmin", getArtist);

// Admin Create Feature Artist
AdminRoute.get("/adminFeatureArtist/:id", validateObjectId,createFeatureArtist);

// Admin All Feature Artist
AdminRoute.get("/featureArtist", getFeatureArtist);

// Admin Create USer And Artist
AdminRoute.post("/adminCreate",multerUpload.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "cover",
      maxCount: 1,
    },
  ]), createUserAdminRegistration);

export default AdminRoute;
