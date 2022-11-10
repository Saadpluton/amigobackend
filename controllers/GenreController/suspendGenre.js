import {Genre , validate} from "#models/GenreModel/genre"
import asyncHandler from "#middlewares/asyncHandler";

//@desc  Suspend Artist
//@route  /artist/suspend/:id
//@request Put Request
//@acess  public

export const suspendGenre = asyncHandler(async (req, res) => {
    
    const { id } = req.params;
      const genre = await Genre.findById(id);

      if(genre)
     {
      if (genre.isSuspend === false){

        const Suspend = await Genre.findOneAndUpdate({_id :id}, { isSuspend: genre.isSuspend = true }, { new: true });
      
       return res.status(200).json({status : true , message : "Genre has been enabled."});
      }
      else{
      const UnSuspend = await Genre.findOneAndUpdate({_id :id}, { isSuspend: genre.isSuspend = false }, { new: true });
      return res.status(200).json({status : true , message : "Genre has been disabled."});  
    }
  }
  else{
    res.status(200).json({status : true , message : "No Artist Found."});  
  }
  });
  