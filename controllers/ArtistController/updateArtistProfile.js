import { Artist } from "#models/ArtistModel/artist"
import asyncHandler from "#middlewares/asyncHandler";
import _ from "lodash";
import {Account} from "#models/AccountModel/account"

//@desc  update Artist Profile
//@route  /artist/update/:id
//@request Put Request
//@acess  public

export const updateArtistProfile = asyncHandler(async (req, res) => {


    const artist = await Artist.findById(req.params.id);
     
    if (!artist) {
        return res.status(404).json({ status: false, message: "Artist record not found" })
    }
    const image = req.file ? `uploads/${req.file?.filename}` : undefined
  
    const update = await Artist.findByIdAndUpdate(req.params.id,{$set : {...req.body,image}})

    return res.status(200).json({ status: true, message: "Artist profile updated successfully" })

})