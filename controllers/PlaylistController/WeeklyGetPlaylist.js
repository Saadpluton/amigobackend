import asyncHandler from "#middlewares/asyncHandler";
import {Playlist , validate} from "#models/PlayListModel/playlist"

//@desc  artist Get
//@route  /artist
//@request Get Request
//@acess  public

export const weeklyGetPlaylist = asyncHandler(async (req, res) => {
  const playlists = await Playlist.find({isSuspend: false}).select('-__v');

  if(playlists.length > 0)
  {
    res.status(200).json(playlists);    
  }
  else{
      res.status(200).json({status : true , message : "No record found"});
  }
});
