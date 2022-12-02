import {Artist} from "#models/ArtistModel/artist"
import asyncHandler from "#middlewares/asyncHandler";

//@desc Recent Artist Get
//@route  /artist
//@request Get Request
//@acess  public

export const recentArtists = asyncHandler(async (req, res) => {
  const artists = await Artist.find({isSuspend: false}).sort({createdAt:-1}).limit(20); 
  if(artists.length > 0)
  {
    res.status(200).json(artists);    
  }
  else{
      res.status(200).json({status : true , message : "No record found"});
  }
});
