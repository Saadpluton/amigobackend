import asyncHandler from "#middlewares/asyncHandler";
import {Playlist} from "#models/PlayListModel/playlist";


export const toggleTrending = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const status = await Playlist.findByIdAndUpdate(id, [{
        $set: {isTrending: {$not: "$isTrending"}}
    }], {new: true});

    if (status) {
        const msg = status?.isTrending
            ? 'Trending playlist has been added.'
            : "Trending playlist has been remove.";
        return res.status(200).send({status: true, message: msg});
    }

    res.status(404).json({status: true, message: "No Playlist Found."});
});