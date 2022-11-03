import { Playlist, validate } from "#models/PlayListModel/playlist"
import asyncHandler from "#middlewares/asyncHandler";

//@desc  Playlist Get
//@route  /playList
//@request Get Request
//@acess  public

export const getPlaylists = asyncHandler(async (req, res) => {

  const query = req.query.genre && req.query.subGenre ? { trackGenre: req.query.genre, trackSubGenre: req.query.subGenre } : {}

  const userId = req.query.userId ? { userId: req.query.userId} : undefined

  let { page = 1, pageSize = 20 } = req.query;
  const count = await Playlist.countDocuments();
  const skip = pageSize * (page - 1);
  let playLists ;
  if(userId)
  {
    playLists = await Playlist.find(userId)
  }
  else{
    playLists = await Playlist.find(query).limit(pageSize).skip(skip)
  }

  //const playLists = await Playlist.find(query).select('-__v').limit(50);

  if (playLists.length > 0) {
    return res.status(200).json({
      status: true,
      playLists,
      message: 'Playlist Fetched Successfully',
      page,
      count,
      pageSize,
      totalPages: Math.ceil(count / pageSize)
    })
  }
  else {
    return res.status(404).json({ status: false, message: "No playlist record found" });
  }
});
