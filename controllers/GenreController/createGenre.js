import { Genre, validate } from "#models/GenreModel/genre";
import asyncHandler from "#middlewares/asyncHandler";
import { PATH } from "#constant/constant";

//@desc  Genre Create
//@route  /genre
//@request Post Request
//@acess  public

export const createGenre = asyncHandler(async (req, res) => {
  const { error } = validate(req.body);

  console.log("genre" , req.body)
 
  if (error) {
    return res
      .status(400)
      .send({ status: false, message: error?.details[0]?.message });
  }
  if (!req.file?.filename) {
    return res
      .status(400)
      .json({ status: false, message: "Please Select the Image" });
  }

  let genre = new Genre(req.body);
  genre.subGenre.push("All");
  genre.image = `${PATH}uploads/${req.file?.filename}`;
  genre = await genre.save();
  return res
    .status(201)
    .json({ status: true, message: "Genre created successfully" });
});
