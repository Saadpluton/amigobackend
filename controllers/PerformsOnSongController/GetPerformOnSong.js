import {PerformOnSong , validate} from "#models/PerformOnSongModel/performsOnSong"
import asyncHandler from "#middlewares/asyncHandler";

//@desc  PerformOnSong Get
//@route  /performOnSong
//@request Get Request
//@acess  public

export const getPerformOnSong = asyncHandler(async (req, res) => {
  const performOnSong = await PerformOnSong.find().select('-__v');

  if(performOnSong.length > 0)
  {
    res.status(200).json(performOnSong);    
  }
  else{
      res.status(404).json({status : false , message : "No record found"});
  }
});
