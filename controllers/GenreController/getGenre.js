import {Genre , validate} from "#models/GenreModel/genre"
import asyncHandler from "#middlewares/asyncHandler";

//@desc  Genre Get
//@route  /genre
//@request Get Request
//@acess  public

export const getGenres = asyncHandler(async (req, res) => {
  const genre = await Genre.find({isSuspend: false}).select('-__v');

  if(genre.length > 0)
  {
    return res.status(200).json(genre);    
  }
  else{
     return res.status(200).json({status : true , message : "No record found"});
  }
});
