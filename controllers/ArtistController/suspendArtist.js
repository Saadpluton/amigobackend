import { Artist } from "#models/ArtistModel/artist"
import asyncHandler from "#middlewares/asyncHandler";

//@desc  Suspend Artist
//@route  /artist/suspend/:id
//@request Put Request
//@acess  public

export const suspendArtist = asyncHandler(async (req, res) => {
    
    const { id } = req.params;
      const artist = await Artist.findById(id);

      if(artist)
     {
      if (artist.isSuspend === false){

        const Suspend = await Artist.findOneAndUpdate({_id :id}, { isSuspend: artist.isSuspend = true }, { new: true });
      
       return res.status(200).json({status : true , message : "Artist has been enabled."});
      }
      else{
      const UnSuspend = await Artist.findOneAndUpdate({_id :id}, { isSuspend: artist.isSuspend = false }, { new: true });
      return res.status(200).json({status : true , message : "Artist has been disabled."});  
    }
  }
  else{
    res.status(200).json({status : true , message : "No Artist Found."});  
  }
  });
  