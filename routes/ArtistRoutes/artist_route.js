import express from "express";
import {multerUpload} from "#utils/multer";

import validateObjectId from "#middlewares/validateObjectId";

import { createArtist } from "#controllers/ArtistController/CreateArtist";
import { weeklyGetArtists } from "#controllers/ArtistController/WeeklyGetArtists";
import { getOneArtist } from "#controllers/ArtistController/GetOneArtist";
import { updateArtistProfile } from "#controllers/ArtistController/updateArtistProfile";
import { suspendArtist } from "#controllers/ArtistController/suspendArtist";
import { topArtists } from "#controllers/ArtistController/TopArtist";
import { getArtistsByName } from "#controllers/ArtistController/GetArtistByName";
import { recentArtists } from "#controllers/ArtistController/RecenttlyAdded";

const artistRoute = express.Router();

// //Create Artist
artistRoute.post("/artist",multerUpload.single("image"),createArtist);

// //GET All Artist
artistRoute.get("/weeklyArtist",weeklyGetArtists );

// //GET Top Artist
artistRoute.get("/topArtist",topArtists );

// //GET Top Artist
artistRoute.get("/artistByName",getArtistsByName);

// //GET One Artist
artistRoute.get("/artist/:id",validateObjectId, getOneArtist);

// //Artist Profile Updated
artistRoute.put("/artist/update/:id",multerUpload.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "cover",
      maxCount: 1,
    },
  ]),validateObjectId,updateArtistProfile);

// //Suspend Artist
artistRoute.put("/artist/suspend/:id",validateObjectId, suspendArtist);

// //GET recent Artist
artistRoute.get("/recent-artist", recentArtists);


export default artistRoute;
