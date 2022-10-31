import express from "express";

import validateObjectId from "#middlewares/validateObjectId";
import { createListener } from "#controllers/ListenerController/CreateListener";
import { getListener } from "#controllers/ListenerController/GetListeners";

const ListenerRoute = express.Router();

// //Track Listener Create
ListenerRoute.post("/trackListener/:id", validateObjectId, createListener);

// // //GET All Listener
ListenerRoute.get("/trackListener", getListener);

export default ListenerRoute;
