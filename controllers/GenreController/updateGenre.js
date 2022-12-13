import { Genre, validate } from "#models/GenreModel/genre";
import asyncHandler from "#middlewares/asyncHandler";

import { PNG, JPG, JPEG,PATH } from "#constant/constant";
//@desc  update Profile
//@route  /user/update/:id
//@request Put Request
//@acess  public

export const updateGenre = asyncHandler(async (req, res) => {

    const genre = await Genre.findById(req.params.id);
    
    if (!genre) {
        return res.status(404).json({ status: true, message: "Genre record not found" })
    }

    let imageFile = req.file;
    if(imageFile)
    {
      if (![PNG, JPEG, JPG].includes(imageFile?.mimetype)) {
        return res.status(400).json({
          status: false,
          message: "Upload image type should be jpg, jpeg, png",
        });
      }
    } 
    let image = imageFile ? {image : `${PATH}uploads/${imageFile?.filename}` } : undefined

    const updateGenre = await Genre.findByIdAndUpdate(req.params.id, {$set :{ ...req.body,...image}},{new : true});
    
    return res.status(200).json({ status: true, message: "Genre updated successfully"})

})