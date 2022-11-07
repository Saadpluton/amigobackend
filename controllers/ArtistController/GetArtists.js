import {Artist , validate} from "#models/ArtistModel/artist"
import asyncHandler from "#middlewares/asyncHandler";

//@desc  artist Get
//@route  /artist
//@request Get Request
//@acess  public

export const getArtists = asyncHandler(async (req, res) => {
  const artists = await Artist.find().select('-__v');

  if(artists.length > 0)
  {
    res.status(200).json(artists);    
  }
  else{
      res.status(200).json({status : true , message : "No record found"});
  }
});
