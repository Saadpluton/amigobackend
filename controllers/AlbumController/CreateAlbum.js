import { Album, validate } from "#models/AlbumModel/album";
import _ from "lodash";
import { Song } from "#models/SongModel/song";
import asyncHandler from "#middlewares/asyncHandler";
import { Artist } from "#models/ArtistModel/artist";
import mongoose from "mongoose";

//@desc  Album Create
//@route  /album
//@request Post Request
//@acess  public

export const createAlbum = asyncHandler(async (req, res) => {
  const { error } = validate(req.body);
console.log(req.body.trackId[0]);
  if (error) {
    return res
      .status(400)
      .send({ status: true, message: error?.details[0]?.message });
  }

  if (!mongoose.Types.ObjectId.isValid(req.body.artistId))
  {
  return res.status(400).send( {status : false , message : 'Invalid artist ID.'}); 
  }
  
  const artist = await Artist.findById(req.body.artistId);
  const trackFind = await Song.findById(req.body.trackId?.[0]);

  if (!artist) {
    return res
      .status(200)
      .json({ status: false, message: "Artist record not found" });
  }

  let album = new Album(_.pick(req.body, ["title", "artistId","genre","description","trackId","privacy"]));
  album.artistName = artist?.name;
  album.trackId = req.body?.trackId;
  album.image = trackFind?.image
  album = await album.save();

  return res
    .status(201)
    .json({ status: true, message: "Album created successfully" });
});
