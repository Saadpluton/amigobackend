import asyncHandler from "#middlewares/asyncHandler";
import { Shares } from "#models/SharesModel/shares";
import { Artist } from "#models/ArtistModel/artist"

//@desc  Shares Get
//@route  /shares
//@request Get Request
//@acess  public

export const totalShares = asyncHandler(async (req, res) => {

    const artist = await Artist.findById(req.params.id);
    if (!artist) {
        return res.status(404).json({ status: false, message: "Artist record not found" })
    }

    const shares = await Shares.find({artistId:req.params.id}).countDocuments();

    return res.status(200).json({ status : true , "Shares" : shares});    
});
