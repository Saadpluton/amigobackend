import { Artist } from "#models/ArtistModel/artist";
//@desc  delete artist 
//@route  /delete
//@request delete Request
//@acess  private

export const deleteArtist = async (req, res) => {
      
  const { id } = req.params;
    const artistFind =  await Artist.findById(id);
     
    if(!artistFind){
        return res.status(404).json({status : false , message : "No record found"});  
      } 
      
      if(artistFind)
      {
        await Artist.findOneAndDelete({_id : id});
       return res.status(200).json({status : true , message : "Artist has been deleted."});  
      }
  };