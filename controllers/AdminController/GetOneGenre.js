import { Genre, validate } from "#models/GenreModel/genre";
import asyncHandler from "#middlewares/asyncHandler";

//@desc  Get One genre 
//@route  /genre/id
//@request Get Request
//@acess  public

export const getOneGenre = asyncHandler(async (req, res) => {

  const genre = await Genre.findById(req.params.id).select("-__v");

  if(genre)
  {
    res.status(200).json(genre);    
  }
  else{
      res.status(404).json({status : true , message : "No record found"});
  }
});
