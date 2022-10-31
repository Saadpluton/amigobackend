import {AlbumTrack , validate} from "#models/AlbumTrackModel/albumTrack"
import asyncHandler from "#middlewares/asyncHandler";

//@desc  AlbumTracks Get
//@route  /albumTrack
//@request Get Request
//@acess  public

export const getAlbumsTrack = asyncHandler(async (req, res) => {
  const albumsTrack = await AlbumTrack.find().select('-__v');

  if(albumsTrack.length > 0)
  {
    res.status(200).json(albumsTrack);    
  }
  else{
      res.status(404).json({status : false , message : "No record found"});
  }
});
