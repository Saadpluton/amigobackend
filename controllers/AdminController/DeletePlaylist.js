import {Playlist} from "#models/PlayListModel/playlist"

//@desc  delete playlist 
//@route  /delete
//@request delete Request
//@acess  public

export const deletePlaylist = async (req, res) => {
      
  const { id } = req.params;
    const playlistFind =  await Playlist.findById(id);
     
    if(!playlistFind){
        return res.status(404).json({status : false , message : "No record found"});  
      } 
      
      if(playlistFind)
      {
        await Playlist.findOneAndDelete({_id : id});
       return res.status(200).json({status : true , message : "Playlist has been deleted."});  
      }
  };