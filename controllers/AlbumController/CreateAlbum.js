import { Album, validate } from "#models/AlbumModel/album";
import _ from "lodash";
import asyncHandler from "#middlewares/asyncHandler";
import { Artist } from "#models/ArtistModel/artist";

//@desc  Album Create
//@route  /album
//@request Post Request
//@acess  public

export const createAlbum = asyncHandler(async (req, res) => {
  const { error } = validate(req.body);

  if (error) {
    return res
      .status(400)
      .send({ status: false, message: error?.details[0]?.message });
  }
  const artist = await Artist.findById(req.body.artistId);

  if (!artist) {
    return res
      .status(404)
      .json({ status: false, message: "Artist record not found" });
  }

  if (!req.file?.filename) {
    return res
      .status(400)
      .json({ status: false, message: "Please Select the Image" });
  }

  let album = new Album(_.pick(req.body, ["title", "artistId", "image"]));
  album.artistName = artist.name;
  album.image = `uploads/${req.file?.filename}`;
  album = await album.save();

  return res
    .status(201)
    .json({ status: true, message: "Album created successfully" });
});
