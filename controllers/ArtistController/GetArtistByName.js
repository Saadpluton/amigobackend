import {Artist , validate} from "#models/ArtistModel/artist"
import asyncHandler from "#middlewares/asyncHandler";

//@desc  Artist Get By Name
//@route  /artist
//@request Get Request
//@acess  public

export const getArtistsByName = asyncHandler(async (req, res) => {
  var regex = new RegExp("^" + req.query.name,'i');

  const artists = await Artist.find({ gender : req.query.gender , name: {$regex : regex }}   );
 
  if(artists.length > 0)
  {
    res.status(200).json(artists);    
  }
  else{
      res.status(404).json({status : false , message : "No record found"});
  }
});