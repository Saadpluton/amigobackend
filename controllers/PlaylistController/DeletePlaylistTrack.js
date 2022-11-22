import { Song, validate } from "#models/SongModel/song";
import asyncHandler from "#middlewares/asyncHandler";
import { Playlist } from "#models/PlayListModel/playlist"

//@desc  All track Get
//@route  /Alltrack
//@request Get Request
//@acess  public

export const deletePlaylistTrack = async (req, res, next) => {
      
  const { id } = req.params;
   
  try {
    const playlistFind =  await Playlist.findById(id);
    const playlistTrackFind =  await Playlist.findOne({trackId : {$in : [req.query.trackId] }});
     
    if(!playlistFind){
      return res.status(404).json({status : false , message : "No playlist record found"});  
      } 
     
      let trackId = playlistFind?.trackId.filter((item)=>{
        return item != req.query.trackId
      })

      if(playlistTrackFind)
      {
       await Playlist.findByIdAndUpdate(id , {$set : {trackId : trackId}});
       return res.status(200).json({status : true , message : "Playlist Track has been deleted."});  
      }
      else{
        return res.status(404).json({status : false , message : "No track record found in playlist"});  
      }
     
    } catch (err) {
      next(err);
    }
  };