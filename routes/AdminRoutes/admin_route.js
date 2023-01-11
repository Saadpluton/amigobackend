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
import { deleteArtist } from "#controllers/AdminController/ArtistDelete";
import { deleteUser } from "#controllers/AdminController/UserDelete";
import { deleteGenre } from "#controllers/AdminController/GenreDelete";
import { deletePlaylist } from "#controllers/AdminController/DeletePlaylist";
import { getOneGenre } from "#controllers/AdminController/GetOneGenre";
import { getOneArtist } from "#controllers/AdminController/GetOneArtist";
import { getOneUser } from "#controllers/AdminController/GetOneUser";
import { getTotalListeners } from "#controllers/AdminController/Analytics";
import {toggleTrending} from "#controllers/AdminController/toggleTrending";

const AdminRoute = express.Router();

// Track Trending Added
AdminRoute.get("/trackTrending/:id",validateObjectId, createTrendingTrack);

// Playlist Trending Added
AdminRoute.get("/playlistTrending/:id",validateObjectId, toggleTrending);

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

  // Admin Delete Artist
  AdminRoute.delete("/admin-remove-artist/:id", validateObjectId,deleteArtist);


 // Admin Delete User
  AdminRoute.delete("/admin-remove-user/:id", validateObjectId,deleteUser);

   // Admin Delete Genre
   AdminRoute.delete("/admin-remove-genre/:id", validateObjectId,deleteGenre);

   // Admin Delete Playlist
   AdminRoute.delete("/admin-remove-playlist/:id", validateObjectId,deletePlaylist);

   // Admin Get One Genre
AdminRoute.get("/admin-one-genre/:id",  validateObjectId, getOneGenre);

   // Admin Get One Artist
   AdminRoute.get("/admin-one-artist/:id",  validateObjectId, getOneArtist);

     // Admin Get One User
     AdminRoute.get("/admin-one-user/:id",  validateObjectId, getOneUser);

     // Admin Get One User
     AdminRoute.get("/totalListeners", getTotalListeners);

export default AdminRoute;
