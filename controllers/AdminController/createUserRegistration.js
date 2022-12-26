import { User, validate } from "#models/UserModel/user"
import bcrypt from "bcryptjs";
import _ from "lodash";
import asyncHandler from "#middlewares/asyncHandler";
import { Artist } from "#models/ArtistModel/artist";
import { PNG, JPG, JPEG, MP3, MPEG, PATH } from "#constant/constant";

//@desc  User Create
//@route  /user
//@request Post Request
//@acess  public

export const createUserAdminRegistration = asyncHandler(async (req, res) => {

  const obj = JSON.parse(JSON.stringify(req.body));
  let image = req.files?.image?.[0];
  let cover = req.files?.cover?.[0];

  if ((![PNG, JPEG, JPG].includes(image?.mimetype || ![PNG, JPEG, JPG].includes(cover?.mimetype))) && (image || cover) ) {
    return res.status(400).json({
      status: false,
      message: "Upload image type should be jpg, jpeg, png",
    });
  }
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send({ status: false, message: error?.details[0]?.message });
  }

  const emailExistsArtist = await Artist.findOne({ role: req.body.role, email: req.body.email });
  const emailExistsUser = await User.findOne({ role: req.body.role, email: req.body.email });

  let customer;
  if (req.body.role === "user") {
    if (emailExistsUser) {
      return res.status(400).json({ status: true, message: "User Email already exist" })
    }
    customer = new User(obj)
    if (!req.body?.name) {
      const name = req.body?.email.split('@').at(0)
      customer.name = name;
    }

    const salt = bcrypt.genSalt(10)
    customer.password = await bcrypt.hash(customer.password, parseInt(salt));
    if (image) {
      customer.image = `${PATH}uploads/${image?.filename}`
    }
    if (cover) {
      customer.cover = `${PATH}uploads/${cover?.filename}`

    }

    customer = await customer.save();
    return res.status(201).json({ status: true, message: "User registered successfully", user: customer })

  }
  else if (req.body.role === "artist") {
    if (emailExistsArtist) {
      return res
        .status(400)
        .json({ status: true, message: "Artist Email already exist" });
    }

    customer = new Artist(obj)
    if (!req.body?.name) {
      const name = req.body?.email.split('@').at(0)
      customer.name = name;
    }
    const salt = bcrypt.genSalt(10)
    customer.password = await bcrypt.hash(customer.password, parseInt(salt));

    if (image) {
      customer.image = `${PATH}uploads/${image?.filename}`
    }
    if (cover) {
      customer.cover = `${PATH}uploads/${cover?.filename}`

    }
    customer = await customer.save();
    return res.status(201).json({ status: true, message: "Artist registered successfully", user: customer })
  } else {
    return res
      .status(400)
      .json({ status: true, message: "Role is not valid!" });
  }
})
