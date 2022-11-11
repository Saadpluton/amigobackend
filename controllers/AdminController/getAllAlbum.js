import { Album, validate } from "#models/AlbumModel/album"
import asyncHandler from "#middlewares/asyncHandler";

//@desc  album Get
//@route  /album
//@request Get Request
//@acess  public

export const getAlbums = asyncHandler(async (req, res) => {

  const albums = await Album.find();
  
  if (albums.length > 0) {
    return res.status(200).json({
      status: true,
      albums,
    })}
  else {
    return res.status(200).json({ status: true, message: "No album record found" });
  }
});
