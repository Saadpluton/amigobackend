import {Artist , validate} from "#models/ArtistModel/artist"
import asyncHandler from "#middlewares/asyncHandler";

//@desc  User Get
//@route  /user
//@request Get Request
//@acess  public

export const getArtists = asyncHandler(async (req, res) => {
  const artists = await Artist.find().select('-__v');

  if(artists.length > 0)
  {
    res.status(200).json(artists);    
  }
  else{
      res.status(404).json({status : false , message : "No record found"});
  }
});
