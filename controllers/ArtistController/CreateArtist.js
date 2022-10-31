import {Artist , validate} from "#models/ArtistModel/artist"
import _ from "lodash";
import asyncHandler from "#middlewares/asyncHandler";
import {Account} from "#models/AccountModel/account"


//@desc  Artist Create
//@route  /artist
//@request Post Request
//@acess  public

export const createArtist = asyncHandler(async (req, res) => {

// const {artistImage} = req.file;



    const {error} = validate(req.body);

    if (error)
    {
      return res.status(400).send({status : false , message : error?.details[0]?.message});
    }

    if(!req.file?.filename)
    {
      return res.status(400).json({ status: false, message: "Please Select the Image" })    
    }

    let artist = new Artist(_.pick(req.body, ['name','country','image']))
    artist.image = `uploads/${req.file?.filename}`
    artist = await artist.save();

    return res.status(201).json({ status: true, message: "Artist registered successfully" })

  })
  