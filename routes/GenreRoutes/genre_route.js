import express from "express";

import { createGenre } from "#controllers/GenreController/createGenre";
import { getGenres } from "#controllers/GenreController/getGenre";

const GenreRoute = express.Router();

// //Genre Create
GenreRoute.post("/genre", createGenre);

// //Get Genre
GenreRoute.get("/genre", getGenres);


export default GenreRoute;
