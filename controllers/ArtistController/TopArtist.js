import {Artist , validate} from "#models/ArtistModel/artist"
import asyncHandler from "#middlewares/asyncHandler";

//@desc  Top Artist Get
//@route  /artist
//@request Get Request
//@acess  public

export const topArtists = asyncHandler(async (req, res) => {
  const artists = await Artist.find().select("name").limit(5); 
  if(artists.length > 0)
  {
    res.status(200).json(artists);    
  }
  else{
      res.status(404).json({status : false , message : "No record found"});
  }
});
