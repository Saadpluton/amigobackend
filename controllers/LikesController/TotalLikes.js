import { User } from "#models/UserModel/user"
import asyncHandler from "#middlewares/asyncHandler";
import { Song } from "#models/SongModel/song";
import { Album } from "#models/AlbumModel/album";
import {Playlist} from "#models/PlayListModel/playlist"

//@desc Total Likes Get
//@route  /totalLikes
//@request Get Request
//@acess  public

export const getTotalLikes = asyncHandler(async (req, res) => {

    
    const totalPlaylist = await Playlist.find().countDocuments();
   
    const totalAlbum = await Album.find().countDocuments();
   
    const totalUser = await User.find({role : "user"}).countDocuments();
   
    const totalArtist = await Artist.find({role : "artist"}).countDocuments();
   
    const totalTrack = await Song.find().countDocuments();
   
    const likes = await Song.find().select('-__v');
   
    let totalComments = 0, totalLikes = 0 , totalListeners = 0;
   
    if (likes.length > 0) {
        totalLikes = likes.reduce((acc, obj) => {
            return acc + obj.totalLikes
        }, 0)
        totalComments = likes.reduce((acc, obj) => {
            return acc + obj.totalComments
        }, 0)
        totalListeners = likes.reduce((acc, obj) => {
            return acc + obj.totalListeners
        }, 0)
    }

    return res.status(200).json({ status: true, totalLikes, totalComments ,totalListeners,totalTrack,totalUser,totalAlbum,totalPlaylist,totalArtist});
});
