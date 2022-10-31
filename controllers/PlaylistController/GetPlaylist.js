import {Playlist , validate} from "#models/PlayListModel/playlist"
import asyncHandler from "#middlewares/asyncHandler";

//@desc  Playlist Get
//@route  /playList
//@request Get Request
//@acess  public

export const getPlaylists = asyncHandler(async (req, res) => {
  const playLists = await Playlist.find().select('-__v');

  if(playLists.length > 0)
  {
    res.status(200).json(playLists);    
  }
  else{
      res.status(404).json({status : false , message : "No record found"});
  }
});
