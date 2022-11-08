import {Album , validate} from "#models/AlbumModel/album"
import asyncHandler from "#middlewares/asyncHandler";
import { Listener } from "#models/ListenerModel/listener";

//@desc  Album Get
//@route  /album
//@request Get Request
//@acess  public

export const getAlbums = asyncHandler(async (req, res) => {
  const ip = req.socket.remoteAddress.split(':').at(-1)
  
  if (!ip) {
    return res
      .status(200)
      .json({ status: true, message: "ip not found"});
  }

  const albums = await Album.find().select('-__v');
 
  const listener = await Listener.find({ userId: ip }).select('-__v');

  if (listener?.length > 0)
    listener?.map((x) => {
      albums?.map((y) => {
         if (y?._id.equals(x?.albumId)) {
          y.isViewed = true
        }
      })
    })


  if(albums?.length > 0)
  {
   return res.status(200).json(albums);    
  }
  else{
    return res.status(200).json({status : true , message : "No record found"});
  }
});
