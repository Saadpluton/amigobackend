import express from "express";
import {multerUpload} from "#utils/multer";

import { createGenre } from "#controllers/GenreController/createGenre";
import { getGenres } from "#controllers/GenreController/getGenre";
import { getGenresFiltration } from "#controllers/GenreController/getGenreFiltration";

const GenreRoute = express.Router();

// //Genre Create
GenreRoute.post("/genre",multerUpload.single("image"), createGenre);

// //Get Genre
GenreRoute.get("/genre", getGenres);

// //Get Genre
GenreRoute.get("/genreFilter", getGenresFiltration);


export default GenreRoute;
