import asyncHandler from "#middlewares/asyncHandler";
import { User } from "#models/UserModel/user";
import { ArtistComments } from "#models/CommentsModel/artist_comments";
import { Artist } from "#models/ArtistModel/artist"
import mongoose from "mongoose";

//@desc  ArtistComments Create And Remove
//@route  /ArtistComments
//@request Post Request
//@acess  public

export const artistComments = asyncHandler(async (req, res) => {

  if (!mongoose.Types.ObjectId.isValid(req.body.userId))
  {
  return res.status(400).send( {status : false , message : 'Invalid user ID.'}); 
  }
  if (!mongoose.Types.ObjectId.isValid(req.body.artistId))
  {
  return res.status(400).send( {status : false , message : 'Invalid artist ID.'}); 
  } 
  if(req.body.parentId)
  {
    if (!mongoose.Types.ObjectId.isValid(req.body.parentId))
    {
    return res.status(400).send( {status : false , message : 'Invalid parent ID.'}); 
    }
  }
  
  const user = await User.findById(req.body.userId);
  const artistFind = await Artist.findById(req.body.userId);
  const artist = await Artist.findById(req.body.artistId);

  if (!artist) {
    return res
      .status(200)
      .json({ status: true, message: "artist record not found" });
  }
  
  if (req.body.parentId !== "") {
    const CommentsParentValid = await ArtistComments.findById(req.body.parentId);

    if (!CommentsParentValid) {
      return res
        .status(200)
        .json({ status: true, message: "Artist parent record not found" });

    }
  }

if(user || artistFind)
{
  
  let image = user ? {image : user?.image} : {image : artist?.image}
  let name = user ? {name : user?.name} : {name : artist?.name}
  
  const parentId = req.body.parentId && req.parentId != "" ? req.body.parentId : undefined

  let comments = new ArtistComments({ userId: req.body.userId, artistId: req.body.artistId, comments: req.body.comments,...name,...image, parentId });
  await comments.save();
  await Artist.findByIdAndUpdate(req.body.artistId, {
    totalComments: artist.totalComments + 1,
  });

  return res
    .status(201)
    .json({ status: true, message: "Artist comments created successfully" });
}
else{
  return res
  .status(200)
  .json({ status: true, message: "Record not found" });
}
  
});
