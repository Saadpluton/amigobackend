import {Genre , validate} from "#models/GenreModel/genre"
import asyncHandler from "#middlewares/asyncHandler";

//@desc  Genre Create
//@route  /genre
//@request Post Request
//@acess  public

export const createGenre = asyncHandler(async (req, res) => {

    const {error} = validate(req.body);

    if (error)
    {
      return res.status(400).send({status : false , message : error?.details[0]?.message});
    }
    let genre = new Genre(req.body)
    genre = await genre.save();
    res.status(201).json({ status: true, message: "Genre created successfully" })
  })
  