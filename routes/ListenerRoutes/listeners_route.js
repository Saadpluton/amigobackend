import express from "express";

import validateObjectId from "#middlewares/validateObjectId";
import { createTrackListener } from "#controllers/ListenerController/CreateTrackListener";
import { getListener } from "#controllers/ListenerController/GetListeners";
import { createPlaylistListener } from "#controllers/ListenerController/CreatePlaylistListener";
import { createAlbumListener } from "#controllers/ListenerController/CreateAlbumListener";

const ListenerRoute = express.Router();

// //Track Listener Create
ListenerRoute.post("/trackListener", createTrackListener);

// //Playlist Listener Create
ListenerRoute.post("/playlistListener", createPlaylistListener);

// //Album Listener Create
ListenerRoute.post("/albumListener", createAlbumListener);

// // //GET All Listener
ListenerRoute.get("/trackListener", getListener);

export default ListenerRoute;
