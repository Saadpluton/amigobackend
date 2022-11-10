import { Playlist, validate } from "#models/PlayListModel/playlist"
import asyncHandler from "#middlewares/asyncHandler";
import { Listener } from "#models/ListenerModel/listener";
import { Likes } from "#models/LikesModel/likes";

//@desc  Playlist Get
//@route  /playList
//@request Get Request
//@acess  public

export const getPlaylists = asyncHandler(async (req, res) => {

  const query = req.query.genre && req.query.subGenre ? { trackGenre: req.query.genre, trackSubGenre: req.query.subGenre } : {}

  const userId = req.query.userId ? { userId: req.query.userId} : undefined

  let { page = 1, pageSize = 100 } = req.query;
  const count = await Playlist.countDocuments();
  const skip = pageSize * (page - 1);
  let playLists ;
  if(userId)
  {
    playLists = await Playlist.find(userId).populate("userId")
  }
  else{
    //playLists = await Playlist.find(query).limit(pageSize).skip(skip)
    playLists = await Playlist.find(query).populate("userId").limit(30)
  
  }

  //const playLists = await Playlist.find(query).select('-__v').limit(50);


  const ip = req.socket.remoteAddress.split(':').at(-1)
  
  if (!ip) {
    return res
      .status(200)
      .json({ status: true, message: "ip not found"});
  }

  const listener = await Listener.find({ userId: ip }).select('-__v');


  if (listener?.length > 0)
    listener?.map((x) => {
      playLists?.map((y) => {
         if (y?._id.equals(x?.playlistId)) {
          y.isViewed = true
        }
      })
    })


  // if (playLists.length > 0) {
  //   return res.status(200).json({
  //     status: true,
  //     playLists,
  //     message: 'Playlist Fetched Successfully',
  //     page,
  //     count,
  //     pageSize,
  //     totalPages: Math.ceil(count / pageSize)
  //   })
  // }
  if (playLists.length > 0) {
    return res.status(200).json({
      status: true,
      playLists,
    })}
  else {
    return res.status(200).json({ status: true, message: "No playlist record found" });
  }
});
