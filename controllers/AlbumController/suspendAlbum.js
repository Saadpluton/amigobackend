import {Album} from "#models/AlbumModel/album"
import asyncHandler from "#middlewares/asyncHandler";
import mongoose from "mongoose";


//@desc  Suspend Album
//@route  /album/suspend/:id
//@request Put Request
//@acess  public

export const suspendAlbum = asyncHandler(async (req, res) => {
    
    const { id } = req.params;
    const album = await Album.findById(id);

      if(album)
     {
      if (album.isSuspend === false){

        const Suspend = await Album.findOneAndUpdate({_id :id}, { isSuspend: album.isSuspend = true }, { new: true });
        res.status(200).json({status : true , message : "Album has been enabled."});
      }
      else{
      const UnSuspend = await Album.findOneAndUpdate({_id :id}, { isSuspend: album.isSuspend = false }, { new: true });
      res.status(200).json({status : true , message : "Album has been disabled."});  
    }
  }
  else{
    res.status(200).json({status : true , message : "No Artist Found."});  
  }
  });
  