import { Artist } from "#models/ArtistModel/artist"
import asyncHandler from "#middlewares/asyncHandler";
import _ from "lodash";
import { PATH } from "#constant/constant";
//@desc  update Artist Profile
//@route  /artist/update/:id
//@request Put Request
//@acess  public

export const updateArtistProfile = asyncHandler(async (req, res) => {


    const artist = await Artist.findById(req.params.id);
     
    if (!artist) {
        return res.status(200).json({ status: true, message: "Artist record not found" })
    }
    const image = req.file ? `${PATH}uploads/${req.file?.filename}` : undefined
  
    const profileComplete = 70
    

    const update = await Artist.findByIdAndUpdate(req.params.id,{$set : {...req.body,image ,profileComplete }})

    return res.status(200).json({ status: true, message: "Artist profile updated successfully" ,artist})

})