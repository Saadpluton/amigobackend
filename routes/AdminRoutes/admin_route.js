import express from "express";
import validateObjectId from "#middlewares/validateObjectId";

import { createTrendingTrack } from "#controllers/AdminController/CreateTrending Track";


const AdminRoute = express.Router();

// Track Trending Added
AdminRoute.get("/trackTrending/:id",validateObjectId, createTrendingTrack);


export default AdminRoute;
