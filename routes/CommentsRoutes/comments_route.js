import express from "express";

import { trackComments } from "#controllers/CommentsController/TrackComments";
import { artistComments } from "#controllers/CommentsController/ArtistComments";
import { getTrackComments } from "#controllers/CommentsController/GetTrackComments";
import { getArtistComments } from "#controllers/CommentsController/GetArtistComments";
import { playlistComments } from "#controllers/CommentsController/PlaylistComments";
import { getPlaylistComments } from "#controllers/CommentsController/GetPlaylistComments";

const CommentsRoute = express.Router();

// //Track Comments Create
CommentsRoute.post("/trackComments", trackComments);

// //Artist Comments Create
CommentsRoute.post("/artistComments", artistComments);

// //Artist Comments Create
CommentsRoute.post("/playllstComments", playlistComments);

// // //GET All Track Comments
CommentsRoute.get("/trackComments", getTrackComments);

// // //GET All Artist Comments
CommentsRoute.get("/artistComments", getArtistComments);

// // //GET All Playlist Comments
CommentsRoute.get("/playlistComments", getPlaylistComments);

export default CommentsRoute;
