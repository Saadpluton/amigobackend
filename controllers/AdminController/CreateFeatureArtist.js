import asyncHandler from "#middlewares/asyncHandler";
import { Artist } from "#models/ArtistModel/artist";

//@desc Create Trending Artist
//@route  /FeatureArtist
//@request Post Request
//@acess  public

export const createFeatureArtist
  = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const featureArtist = await Artist.findById(id);
    if (featureArtist) {
      if (featureArtist.isFeatured === false) {
        const added = await Artist.findOneAndUpdate({ _id: id }, { isFeatured: featureArtist.isFeatured = true }, { new: true });
        return res.status(200).json({ status: true, message: "Feature Artist has been added." });
      }
      else {
        const remove = await Artist.findOneAndUpdate({ _id: id }, { isFeatured: featureArtist.isFeatured = false }, { new: true });
        return res.status(200).json({ status: true, message: "Feature Artist has been remove." });
      }
    }
    else {
      return res.status(404).json({ status: true, message: "No Artist Found." });
    }

  });
