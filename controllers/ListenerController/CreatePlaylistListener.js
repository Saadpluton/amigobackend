import asyncHandler from "#middlewares/asyncHandler";
import { Listener } from "#models/ListenerModel/listener"
import {Playlist , validate} from "#models/PlayListModel/playlist"
import mongoose from "mongoose";

///@desc  Artsit Listener Create
//@route  /trackListener
//@request Post Request
//@acess  public

export const createPlaylistListener = asyncHandler(async (req, res) => {

  if (!mongoose.Types.ObjectId.isValid(req.body.playlistId))
  {
  return res.status(400).send( {status : false , message : 'Invalid playlist ID.'}); 
  }
  const ip = req.socket.remoteAddress.split(':').at(-1)

  if (!ip) {
    return res
      .status(200)
      .json({ status: true, message: "ip not found"});
  }

  const playlist = await Playlist.findById(req.body.playlistId);

  if (!playlist) {
    return res
      .status(200)
      .json({ status: true, message: "playlist record not found" });
  }

  const listenerValid = await Listener.findOne({ userId: ip, playlistId: req.body.playlistId });
//console.log(listenerValid)

  if (!listenerValid) {
    let listener = new Listener({ userId: ip, playlistId: req.body.playlistId })
    await listener.save();
    await Playlist.findByIdAndUpdate(req.body.playlistId, {
      totalListeners: playlist.totalListeners + 1,
    });
    return res.status(201).json({ status: true, message: "Playlist listener created successfully" })
  }
  else {
    return res.status(200).json({ status: true, message: "Playlist listener already added" })
  }
});
