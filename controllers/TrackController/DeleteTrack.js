import { Song, validate } from "#models/SongModel/song";
import asyncHandler from "#middlewares/asyncHandler";

//@desc  All track Get
//@route  /Alltrack
//@request Get Request
//@acess  public

export const deleteTrack = async (req, res, next) => {
      
  const { id } = req.params;
   
  try {
    const songFind =  await Song.findById(id);
     
    if(!songFind){
        return res.status(404).json({status : false , message : "No record found"});  
      } 
      
      if(songFind)
      {
        await Song.findOneAndDelete({_id : id});
       return res.status(200).json({status : true , message : "Track has been deleted."});  
      }
     
    } catch (err) {
      next(err);
    }
  };