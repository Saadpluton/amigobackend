import { Artist, validate } from "#models/ArtistModel/artist";
import asyncHandler from "#middlewares/asyncHandler";

//@desc  Track Get
//@route  /Track
//@request Get Request
//@acess  public

export const getArtist = asyncHandler(async (req, res) => {

  const artist = await Artist.find();
  
  if (artist.length > 0) {
    return res.status(200).json({
      status: true,
      artist,
    })}
  else {
    return res.status(200).json({ status: true, message: "No Artist record found" });
  }
});
