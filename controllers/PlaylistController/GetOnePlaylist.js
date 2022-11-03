import {Playlist , validate} from "#models/PlayListModel/playlist"
import asyncHandler from "#middlewares/asyncHandler";

//@desc  Get One Playlist 
//@route  /playlist/id
//@request Get Request
//@acess  public

export const getOnePlaylist = asyncHandler(async (req, res) => {

  //const playlists = await Playlist.findById(req.params.id).populate('trackId');
  
//  const playlists = await Playlist.findById(req.params.id).populate('trackId');

  const result = await Playlist.aggregate([
    {
      $lookup:
      {
        from: 'songs',
        localField: 'trackId',
        foreignField: '_id',
        as: 'TrackInfo'
      }
    },
    {
      $unwind: '$TrackInfo'
    }

  ]);
console.log(result)
  if (result.length > 0) {
    res.status(200).json(result);
  }
  else {
    res.status(404).json({ status: false, message: `No record found` });

  }


  // if (playlists) {
  //   return res.status(200).json(playlists);
  // }
  // else {
  //   res.status(404).json({ status: false, message: "No record found" });
  // }
});
