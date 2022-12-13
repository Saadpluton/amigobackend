import {User} from "#models/UserModel/user"

//@desc  delete user 
//@route  /delete
//@request delete Request
//@acess  private

export const deleteUser = async (req, res) => {
      
  const { id } = req.params;
    const userFind =  await User.findById(id);
     
    if(!userFind){
        return res.status(404).json({status : false , message : "No record found"});  
      } 
      
      if(userFind)
      {
        await User.findOneAndDelete({_id : id});
       return res.status(200).json({status : true , message : "User has been deleted."});  
      }
  };