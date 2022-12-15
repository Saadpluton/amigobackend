import { User } from "#models/UserModel/user"
import asyncHandler from "#middlewares/asyncHandler";
import { Song } from "#models/SongModel/song";

//@desc Total Likes Get
//@route  /totalLikes
//@request Get Request
//@acess  public

export const getTotalListeners = asyncHandler(async (req, res) => {
    
      const totalListener = await Song.find();
   
    let totalListeners = 0;
   
    if (totalListener.length > 0) {
        totalListeners = totalListener.reduce((acc, obj) => {
            return acc + obj.totalListeners
        }, 0)
    }

    return res.status(200).json({ status: true, totalListeners});
});
