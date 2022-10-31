import {Album , validate} from "#models/AlbumModel/album"
import asyncHandler from "#middlewares/asyncHandler";

//@desc  Get One Album 
//@route  /album/id
//@request Get Request
//@acess  public

export const getOneAlbum = asyncHandler(async (req, res) => {

  const albums = await Album.findById(req.params.id).select("-__v");

  if (albums) {
    return res.status(200).json(albums);
  }
  else {
    res.status(404).json({ status: false, message: "No record found" });
  }
});
