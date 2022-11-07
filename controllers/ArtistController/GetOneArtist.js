import { Artist } from "#models/ArtistModel/artist"
import asyncHandler from "#middlewares/asyncHandler";

//@desc  Get One Artist 
//@route  /artist/id
//@request Get Request
//@acess  public

export const getOneArtist = asyncHandler(async (req, res) => {

  const artist = await Artist.findById(req.params.id).select("-__v");

  if (artist) {
    return res.status(200).json(artist);
  }
  else {
    res.status(404).json({ status: true, message: "No record found" });
  }
});
