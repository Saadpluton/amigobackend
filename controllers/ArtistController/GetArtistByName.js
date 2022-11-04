import { Artist, validate } from "#models/ArtistModel/artist"
import asyncHandler from "#middlewares/asyncHandler";

//@desc  Artist Get By Name
//@route  /artist
//@request Get Request
//@acess  public

export const getArtistsByName = asyncHandler(async (req, res) => {
  var regex = new RegExp("^" + req.query.name, 'i');

  // db.customers.find({
  //   $and: [
  //     {
  //       $or: [
  //         {
  //           "Country": "Germany"
  //         },
  //         {
  //           "Country": "France"
  //         }
  //       ]
  //     },
  //     {
  //       VIP: true
  //     }
  //   ]
  // })

  const name = req.query.name ? { name: { $regex: regex } } : {}
  const gender = req.query.gender ? { gender: req.query.gender } : {}
  const genre = req.query.genre ? { genre: { $in: [req.query.genre] } } : {}
  const subGenre = req.query.subGenre ? { subGenre: { $in: [req.query.subGenre] } } : {}


  const artists = await Artist.find({
    $and: [
      name,
      gender,
      genre,
      subGenre
    ]
  });


  if (artists.length > 0) {
    res.status(200).json(artists);
  }
  else {
    res.status(404).json({ status: false, message: "No record found" });
  }
});