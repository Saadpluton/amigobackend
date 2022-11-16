import { Playlist, validate } from "#models/PlayListModel/playlist"
import asyncHandler from "#middlewares/asyncHandler";
import { Listener } from "#models/ListenerModel/listener";
import { Likes } from "#models/LikesModel/likes";

//@desc  Playlist Get
//@route  /playList
//@request Get Request
//@acess  public

export const getPlaylistsByUserId = asyncHandler(async (req, res) => {

  let { page = 1, pageSize = 100 } = req.query;
  const count = await Playlist.countDocuments();
  const skip = pageSize * (page - 1);
  let playLists ;
  
  if(req.query?.userId )
  {
    playLists = await Playlist.find({userId: req.query.userId , isSuspend: false})
  }
  else if(req.query?.artistId )
  {
    playLists = await Playlist.find({artistId: req.query.artistId , isSuspend: false})
  }
  else{
    return res
      .status(200)
      .json({ status: true, message: "Record not found"});
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
