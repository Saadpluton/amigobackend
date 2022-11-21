import { User, validate } from "#models/UserModel/user"
import bcrypt from "bcrypt";
import _ from "lodash";
import asyncHandler from "#middlewares/asyncHandler";
import { PATH } from "#constant/constant";
import { Artist } from "#models/ArtistModel/artist";
import { UserVerification } from "#models/UserModel/userVerification"
import nodemailer from "nodemailer";

//@desc  User Create
//@route  /user
//@request Post Request
//@acess  public

export const createUser = asyncHandler(async (req, res) => {

  const obj = JSON.parse(JSON.stringify(req.body));
console.log(req.file);
  const checkedvalid = await UserVerification.findOne({ email: obj.email, role: obj.role, resetId: obj.resetId })
  if (!checkedvalid) {
    return res.status(404).json({ status: true, message: "Please verify email!" })
  }

  let { resetId, ...data } = obj

  const { error } = validate(data);
  if (error) {
    return res.status(400).send({ status: false, message: error?.details[0]?.message });
  }

  const emailExistsArtist = await Artist.findOne({ role: req.body.role, email: req.body.email });
  const emailExistsUser = await User.findOne({ role: req.body.role, email: req.body.email });

  function welcomeEmail(customer){
    const mailOptions = {
      from: "sk5908774@gmail.com",
      to: req.body.email,
      subject: "Welcome To Amigo",
      html: `<p>Hi ${customer.name},
      Welcome to Amigo. We’re thrilled to see you here!When we built Amigo Sound we set out to create something completely and totally different, a music platform engineered from the ground up for serious artists and fans of music that don’t want to be spoonfed the same tracks they can hear on their local radio.
      We spent a lot of time creating a platform that could represent artists and musicians at every level, from backyard bands just getting together to jam all the way up to some of the biggest superstars in music today.`
    }
    let transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sk5908774@gmail.com",
        pass: "otwduudpsiaonjaz"
      }
    });
    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error)
      }
    })
  }
  let customer;
  if (req.body.role === "user") {
    if (emailExistsUser) {
      return res.status(400).json({ status: true, message: "User Email already exist" })
    }
    customer = new User(data)
    if (!req.body?.name) {
      const name = req.body?.email.split('@').at(0)
      customer.name = name;
    }

    const salt = bcrypt.genSalt(10)
    customer.password = await bcrypt.hash(customer.password, parseInt(salt));
    if (req.file?.filename) {
      customer.image = `${PATH}uploads/${req.file?.filename}`
    }

    customer = await customer.save();
    await UserVerification.findOneAndDelete({ email: obj.email });
    welcomeEmail(customer);
    return res.status(201).json({ status: true, message: "User registered successfully", user: customer })

  }
  else if (req.body.role === "artist") {
    if (emailExistsArtist) {
      return res
        .status(400)
        .json({ status: true, message: "Artist Email already exist" });
    }

    customer = new Artist(data)
    if (!req.body?.name) {
      const name = req.body?.email.split('@').at(0)
      customer.name = name;
    }
    const salt = bcrypt.genSalt(10)
    customer.password = await bcrypt.hash(customer.password, parseInt(salt));

    if (req.file?.filename) {
      customer.image = `${PATH}uploads/${req.file?.filename}`
    }
    customer = await customer.save();
    await UserVerification.findOneAndDelete({ email: obj.email });
    welcomeEmail(customer);
    return res.status(201).json({ status: true, message: "Artist registered successfully", user: customer })
  } else {
    return res
      .status(400)
      .json({ status: true, message: "Role is not valid!" });
  }
})
