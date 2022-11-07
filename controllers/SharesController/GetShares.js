import asyncHandler from "#middlewares/asyncHandler";
import { Shares } from "#models/SharesModel/shares";

//@desc  shares Get
//@route  /shares
//@request Get Request
//@acess  public

export const getShare = asyncHandler(async (req, res) => {
  const shares = await Shares.find().select('-__v');

  if(shares.length > 0)
  {
    res.status(200).json(shares);    
  }
  else{
      res.status(404).json({status : true , message : "No record found"});
  }
});
