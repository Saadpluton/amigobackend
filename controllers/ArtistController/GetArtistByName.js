import { Artist, validate } from "#models/ArtistModel/artist";
import asyncHandler from "#middlewares/asyncHandler";

//@desc  Artist Get By Name
//@route  /artist
//@request Get Request
//@acess  public

export const getArtistsByName = asyncHandler(async (req, res) => {
  var regex = new RegExp("^" + req.query.name, "i");

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

  const name =
    req.query.name != "All" ? { name: { $regex: regex } } : undefined;
  const gender =
    req.query.gender != "All" ? { gender: req.query.gender } : undefined;
  const genre =
    req.query.genre != "All"
      ? { genre: { $in: [req.query.genre] } }
      : undefined;
  const subGenre =
    req.query.subGenre != "All"
      ? { subGenre: { $in: [req.query.subGenre] } }
      : undefined;

  let arr = [name, gender, genre, subGenre];
  const resultQuery = arr.filter((item) => {
    return item;
  });
  console.log(resultQuery);
  let artists;
  if (resultQuery.length > 0) {
    artists = await Artist.find({
      $and: resultQuery,
    });
  } else {
    artists = await Artist.find().limit(100);
  }

  if (artists.length > 0) {
    res.status(200).json(artists);
  } else {
    res.status(404).json({ status: false, message: "No record found" });
  }
});
