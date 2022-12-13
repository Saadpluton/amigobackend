import { Genre, validate } from "#models/GenreModel/genre";

//@desc  delete Genre 
//@route  /delete
//@request delete Request
//@acess  private

export const deleteGenre = async (req, res) => {
      
  const { id } = req.params;
    const genreFind =  await Genre.findById(id);
     
    if(!genreFind){
        return res.status(404).json({status : false , message : "No record found"});  
      } 
      
      if(genreFind)
      {
        await Genre.findOneAndDelete({_id : id});
       return res.status(200).json({status : true , message : "Genre has been deleted."});  
      }
  };