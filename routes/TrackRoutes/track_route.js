import express from "express";
import { multerAudioAndImageUpload } from "#utils/multer";

import validateObjectId from "#middlewares/validateObjectId";

import { createTrack } from "#controllers/TrackController/CreateTrack";
import { getTracks } from "#controllers/TrackController/GetTrack";
import { getOneTrack } from "#controllers/TrackController/GetOneTrack";
import { updateTrack } from "#controllers/TrackController/updateTrack";
import { suspendTrack } from "#controllers/TrackController/suspendTrack";
import { getNewTracks } from "#controllers/TrackController/GetNewTrack";
import { getAllTracks } from "#controllers/TrackController/GetAllTrack";
import { getAllArtistTracks } from "#controllers/TrackController/GetArtistTrack";
import { deleteTrack } from "#controllers/TrackController/DeleteTrack";
import { addTrackFavourite } from "#controllers/TrackController/AddedToFavourite";
import { getFavouriteTracks } from "#controllers/TrackController/GetFavouriteTrack";

const TrackRoute = express.Router();

// //Create Track
TrackRoute.post(
  "/track",
  multerAudioAndImageUpload.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "audio",
      maxCount: 1,
    },
  ]),
  createTrack
);

// //GET All Track
TrackRoute.get("/track", getTracks);

// //delete Track
TrackRoute.delete("/track/:id",validateObjectId, deleteTrack);

// // //GET One Track
TrackRoute.get("/track/:id", validateObjectId, getOneTrack);

// // //GET Newly Track
TrackRoute.get("/newTrack", getNewTracks);

// // //Track Updated
TrackRoute.put(
  "/track/update/:id",
  multerAudioAndImageUpload.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "audio",
      maxCount: 1,
    },
  ]),
  validateObjectId,
  updateTrack
);

// // //Suspend Track
TrackRoute.put("/track/suspend/:id", validateObjectId, suspendTrack);

// // //Get All Track Admin
TrackRoute.get("/allTrack", getAllTracks);

// // //Get All Artist Track
TrackRoute.get("/allTrackArtist/:id",validateObjectId, getAllArtistTracks);

// // //Add Track To Favourite
TrackRoute.post("/favouriteTrack", addTrackFavourite);

// // //Get All Favourite Track
TrackRoute.get("/favouriteTrack", getFavouriteTracks);

export default TrackRoute;
