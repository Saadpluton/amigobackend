import asyncHandler from "#middlewares/asyncHandler";
import { Listener } from "#models/ListenerModel/listener"
import { Song, validate } from "#models/SongModel/song"
import { Album } from "#models/AlbumModel/album";
import mongoose from "mongoose";

///@desc  Artsit Listener Create
//@route  /albumListener
//@request Post Request
//@acess  public

export const createAlbumListener = asyncHandler(async (req, res) => {

    
  if (!mongoose.Types.ObjectId.isValid(req.body.albumId))
  {
  return res.status(400).send( {status : false , message : 'Invalid album ID.'}); 
  }

  const ip = req.socket.remoteAddress.split(':').at(-1)
//console.log(ip)
  if (!ip) {
    return res
      .status(200)
      .json({ status: true, message: "ip not found"});
  }
  const album = await Album.findById(req.body.albumId);

  if (!album) {
    return res
      .status(200)
      .json({ status: true, message: "Album record not found" });
  }

  const listenerValid = await Listener.findOne({ userId: ip, albumId: req.body?.albumId });
//console.log(listenerValid)

  if (!listenerValid) {
    let listener = new Listener({ userId: ip, albumId: req.body.albumId })
    await listener.save();
    await Album.findByIdAndUpdate(req.body.albumId, {
      totalListeners: album.totalListeners + 1,
    });
    return res.status(201).json({ status: true, message: "Album listener created successfully" })
  }
  else {
    return res.status(200).json({ status: true, message: "Album listener already added" })
  }
});
