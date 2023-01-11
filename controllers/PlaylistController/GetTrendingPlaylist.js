import asyncHandler from "#middlewares/asyncHandler";
import {Playlist} from "#models/PlayListModel/playlist";


export const getTrendingPlaylists = asyncHandler(async (req, res) => {
    const playlists = await Playlist.find({isTrending: true});

    playlists?.length > 0
        ? res.status(200).send(playlists)
        : res.status(200).send({status: true, message: "No Trending Playlist found"})
})