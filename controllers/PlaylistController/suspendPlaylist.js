import { Playlist, validate } from "#models/PlayListModel/playlist"
import asyncHandler from "#middlewares/asyncHandler";

//@desc  Suspend Playlist
//@route  /playlist/suspend/:id
//@request Put Request
//@acess  public

export const suspendPlaylist = asyncHandler(async (req, res) => {
    
    const { id } = req.params;
      const playlist = await Playlist.findById(id);

      if(playlist)
     {
      if (playlist.isSuspend === false){

        const Suspend = await Playlist.findOneAndUpdate({_id :id}, { isSuspend: playlist.isSuspend = true }, { new: true });
      
       return res.status(200).json({status : true , message : "Playlist has been enabled."});
      }
      else{
      const UnSuspend = await Playlist.findOneAndUpdate({_id :id}, { isSuspend: playlist.isSuspend = false }, { new: true });
      return res.status(200).json({status : true , message : "Playlist has been disabled."});  
    }
  }
  else{
    res.status(200).json({status : true , message : "No playlist Found."});  
  }
  });
  