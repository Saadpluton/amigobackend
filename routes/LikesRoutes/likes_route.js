import express from "express";

import validateObjectId from "#middlewares/validateObjectId";

import { trackLikes } from "#controllers/LikesController/TrackLikes";
import { getLikes } from "#controllers/LikesController/GetLikes";
import { albumLikes } from "#controllers/LikesController/AlbumLikes";
import { artistLikes } from "#controllers/LikesController/ArtistLikes";

const LikesRoute = express.Router();

// //Track Likes Create
LikesRoute.post("/tracklikes/:id", validateObjectId, trackLikes);

// //Album Likes Create
LikesRoute.post("/albumlikes/:id", validateObjectId, albumLikes);

// //Artist Likes Create
LikesRoute.post("/artistlikes/:id", validateObjectId, artistLikes);

// // //GET All likes
LikesRoute.get("/likes", getLikes);

export default LikesRoute;
