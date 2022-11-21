import { Artist } from "#models/ArtistModel/artist"
import asyncHandler from "#middlewares/asyncHandler";
import _ from "lodash";
import { PNG, JPG, JPEG, MP3, MPEG, PATH } from "#constant/constant";

//@desc  update Artist Profile
//@route  /artist/update/:id
//@request Put Request
//@acess  public

export const updateArtistProfile = asyncHandler(async (req, res) => {


    const artist = await Artist.findById(req.params.id);
     
    let imageFile = req.files?.image?.[0];
    let coverFile = req.files?.cover?.[0];
    if (!artist) {
        return res.status(200).json({ status: true, message: "Artist record not found" })
    }
    if ((![PNG, JPEG, JPG].includes(imageFile?.mimetype || ![PNG, JPEG, JPG].includes(coverFile?.mimetype))) && (imageFile || coverFile) ) {
        return res.status(400).json({
          status: false,
          message: "Upload image type should be jpg, jpeg, png",
        });
      }
    const profileComplete = 70
    
    let image = imageFile ? {image : `${PATH}uploads/${imageFile?.filename}` } : undefined
   
    let cover = coverFile ? {cover : `${PATH}uploads/${coverFile?.filename}` } : undefined
   

    const update = await Artist.findByIdAndUpdate(req.params.id,{$set : {...req.body,...image,...cover ,profileComplete }},{new:true})

    return res.status(200).json({ status: true, message: "Artist profile updated successfully" ,artist : update})

})