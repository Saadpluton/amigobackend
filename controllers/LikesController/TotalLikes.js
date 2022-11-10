import { User, validate } from "#models/UserModel/user"
import asyncHandler from "#middlewares/asyncHandler";
import { Song } from "#models/SongModel/song";
import { Likes } from "#models/LikesModel/likes";

//@desc Total Likes Get
//@route  /totalLikes
//@request Get Request
//@acess  public

export const getTotalLikes = asyncHandler(async (req, res) => {

    const totalUser = await User.find().countDocuments();
   
    const totalTrack = await Song.find().countDocuments();
   
    const likes = await Song.find().select('-__v');
   
    let totalComments = 0, totalLikes = 0;
   
    if (likes.length > 0) {
        totalLikes = likes.reduce((acc, obj) => {
            return acc + obj.totalLikes
        }, 0)
        totalComments = likes.reduce((acc, obj) => {
            return acc + obj.totalComments
        }, 0)
    }

    return res.status(200).json({ status: true, totalLikes, totalComments ,totalTrack,totalUser});
});
