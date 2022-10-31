import express from "express";

import validateObjectId from "#middlewares/validateObjectId";

import { createShare } from "#controllers/SharesController/CreateShares";
import { getShare } from "#controllers/SharesController/GetShares";


const SharesRoute = express.Router();

// //Shares Create
SharesRoute.post("/shares/:id",validateObjectId,createShare);

// // //GET All Shares
SharesRoute.get("/shares",getShare );


export default SharesRoute;
