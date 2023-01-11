import {Artist} from "#models/ArtistModel/artist"
import asyncHandler from "#middlewares/asyncHandler";
import {Song} from "#models/SongModel/song";
import {Playlist} from "#models/PlayListModel/playlist";

//@desc Recent Artist Get
//@route  /artist
//@request Get Request
//@acess  public

export const recentArtists = asyncHandler(async (req, res) => {
    const artists = await Artist.find({isSuspend: false}).sort({createdAt: -1}).limit(20).lean()

    let records = [];

    records = await Promise.all(artists.map(async artist => {
        const record = await Song.findOne({artistId: artist._id}, {totalListeners: 1});
        let totalListeners = 0

        if (record) totalListeners = record?.totalListeners;


        return {...artist, totalListeners};
    }));

    records = await Promise.all(records.map(async record => {
        const playlists = await Playlist.find({artistId: record._id}, {image: 1})
        return {...record, playlists}
    }))


    if (records?.length > 0)
        res.status(200).json(records);
    else {
        res.status(200).json({status: true, message: "No record found"});
    }
});
