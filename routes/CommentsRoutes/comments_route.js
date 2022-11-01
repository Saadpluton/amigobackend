import express from "express";

import { trackComments } from "#controllers/CommentsController/TrackComments";
import { getComments } from "#controllers/CommentsController/GetComments";
import { playlistComments } from "#controllers/CommentsController/PlaylistComments";
import { artistComments } from "#controllers/CommentsController/ArtistComments";

const CommentsRoute = express.Router();

// //Track Comments Create
CommentsRoute.post("/trackComments", trackComments);

// //Playlist Comments Create
CommentsRoute.post("/playllstComments", playlistComments);

// //Playlist Comments Create
CommentsRoute.post("/artistComments", artistComments);

// // //GET All Comments
CommentsRoute.get("/comments", getComments);

export default CommentsRoute;
