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
    req.query.name != "All" ? { name: { $regex: regex } , isSuspend: false } : undefined;
  const gender =
    req.query.gender != "All" ? { gender: req.query.gender ,isSuspend: false} : { gender: "All" ,isSuspend: false};
  const genre =
    req.query.genre != "All"
      ? { genre: { $in: [req.query.genre] } }
      : undefined;

  let arr = [name, gender, genre];
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
    artists = await Artist.find({isSuspend: false}).limit(100);
  }

  
  if (artists.length > 0) {
    res.status(200).json({artists : artists} );
  } else {
    res.status(200).json({ status: true, message: "No record found",artists : artists });
  }
});
