import { Artist, validate } from "#models/ArtistModel/artist";
import _ from "lodash";
import asyncHandler from "#middlewares/asyncHandler";
import { PATH } from "#constant/constant";
import bcrypt from "bcrypt";

//@desc  Artist Create
//@route  /artist
//@request Post Request
//@acess  public

export const createArtist = asyncHandler(async (req, res) => {
  // const {artistImage} = req.file;

  const { error } = validate(req.body);

  if (error) {
    return res
      .status(400)
      .send({ status: false, message: error?.details[0]?.message });
  }
  const emailExists = await Artist.findOne({ email: req.body.email });

  if (emailExists) {
    return res
      .status(400)
      .json({ status: false, message: "Email already exist" });
  }

  // if(!req.file?.filename)
  // {
  //   return res.status(400).json({ status: false, message: "Please Select the Image" })
  // }

  let artist = new Artist(
    _.pick(req.body, [
      "name",
      "country",
      "image",
      "description",
      "gender",
      "dob",
      "genre",
      "subGenre",
      "password",
      "email",
    ])
  );
  const salt = bcrypt.genSalt(10);
  artist.password = await bcrypt.hash(artist.password, parseInt(salt));
  if (!req.body?.name) {
      const name =  req.body?.email.split('@').at(0)
    artist.name = name;
  }

  if (req.file?.filename) {
    artist.image = `${PATH}uploads/${req.file?.filename}`;
  }
  artist = await artist.save();

  return res
    .status(201)
    .json({ status: true, message: "Artist registered successfully" });
});
