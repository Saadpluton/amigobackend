import {Album , validate} from "#models/AlbumModel/album"
import asyncHandler from "#middlewares/asyncHandler";

//@desc  Album Get
//@route  /album
//@request Get Request
//@acess  public

export const getAlbums = asyncHandler(async (req, res) => {
  const albums = await Album.find().select('-__v');

  if(albums.length > 0)
  {
    res.status(200).json(albums);    
  }
  else{
      res.status(404).json({status : true , message : "No record found"});
  }
});
