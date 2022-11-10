import express from "express";
import {multerUpload} from "#utils/multer";

import validateObjectId from "#middlewares/validateObjectId";

import { createGenre } from "#controllers/GenreController/createGenre";
import { getGenres } from "#controllers/GenreController/getGenre";
import { getGenresFiltration } from "#controllers/GenreController/getGenreFiltration";
import { suspendGenre } from "#controllers/GenreController/suspendGenre";

const GenreRoute = express.Router();

// //Genre Create
GenreRoute.post("/genre",multerUpload.single("image"), createGenre);

// //Get Genre
GenreRoute.get("/genre", getGenres);

// //Get Genre
GenreRoute.get("/genreFilter", getGenresFiltration);

// //Suspend Genre
GenreRoute.put("/genre/suspend/:id",validateObjectId, suspendGenre);


export default GenreRoute;
