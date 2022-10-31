import {PlaylistTrack , validate} from "#models/PlayListTrackModel/playlistTrack"
import asyncHandler from "#middlewares/asyncHandler";

//@desc  PlaylistTrack Get
//@route  /playListTrack
//@request Get Request
//@acess  public

export const getPlaylistTracks = asyncHandler(async (req, res) => {
  const playListTracks = await PlaylistTrack.find().select('-__v');

  if(playListTracks.length > 0)
  {
    res.status(200).json(playListTracks);    
  }
  else{
      res.status(404).json({status : false , message : "No record found"});
  }
});
