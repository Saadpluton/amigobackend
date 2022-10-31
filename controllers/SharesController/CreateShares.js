import asyncHandler from "#middlewares/asyncHandler";
import { Shares } from "#models/SharesModel/shares"
import { User } from "#models/UserModel/user"
import { Artist } from "#models/ArtistModel/artist"

//@desc  Shares Create
//@route  /shares
//@request Post Request
//@acess  public

export const createShare = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({ status: false, message: "User record not found" })
    }

    const artist = await Artist.findById(req.body.artistId);
    if (!artist) {
        return res.status(404).json({ status: false, message: "Artist record not found" })
    }

    const sharesValid = await Shares.findOne({ userId: req.params.id, artistId: req.body.artistId });

    if (!sharesValid) {
        let shares = new Shares({ userId: req.params.id, artistId: req.body.artistId })
        await shares.save();

        return res.status(201).json({ status: true, message: "Shares created successfully" })
    }
    else {
        return res.status(200).json({ status: true, message: "Shares sent Already" })
    }
})
