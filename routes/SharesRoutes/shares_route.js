import express from "express";

import validateObjectId from "#middlewares/validateObjectId";

import { getShare } from "#controllers/SharesController/GetShares";
import { artistShares } from "#controllers/SharesController/ArtistShare";
import { albumShares } from "#controllers/SharesController/AlbumShare";
import { trackShares } from "#controllers/SharesController/TrackShare";


const SharesRoute = express.Router();

// //Artist Shares Create
SharesRoute.post("/artistShares/:id",validateObjectId,artistShares);

// //Album Shares Create
SharesRoute.post("/albumShares/:id",validateObjectId,albumShares);

// //Album Shares Create
SharesRoute.post("/trackShares/:id",validateObjectId,trackShares);

// // //GET All Shares
SharesRoute.get("/shares",getShare );


export default SharesRoute;
