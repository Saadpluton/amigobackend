import { Album } from "#models/AlbumModel/album";
import asyncHandler from "#middlewares/asyncHandler";
import _ from "lodash";
import { Artist } from "#models/ArtistModel/artist";
import mongoose from "mongoose";

//@desc  update Artist Profile
//@route  /album/update/:id
//@request Put Request
//@acess  public

export const updateAlbum = asyncHandler(async (req, res) => {

  if (!mongoose.Types.ObjectId.isValid(req.body.artistId))
  {
  return res.status(400).send( {status : false , message : 'Invalid artist ID.'}); 
  }
  const artist = await Artist.findById(req.body.artistId);

  const album = await Album.findById(req.params.id);

  if (!album) {
    return res
      .status(200)
      .json({ status: true, message: "Album record not found" });
  }
  if (!artist && req.body.artistId) {
    return res
      .status(200)
      .json({ status: true, message: "Artist record not found" });
  }

  const update = await Album.findByIdAndUpdate(req.params.id, {
    $set: {
      ...req.body,
      image: `uploads/${req.file?.filename}`,
      artistName: artist.name,
    },
  });

  return res
    .status(200)
    .json({ status: true, message: "Album updated successfully" });
});
