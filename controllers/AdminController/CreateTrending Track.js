import { Album, validate } from "#models/AlbumModel/album";
import _ from "lodash";
import asyncHandler from "#middlewares/asyncHandler";
import { Artist } from "#models/ArtistModel/artist";
import mongoose from "mongoose";
import { Song } from "#models/SongModel/song";
//@desc Create Trending Track
//@route  /trendingTrack
//@request Post Request
//@acess  public

export const createTrendingTrack
  = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const trendingTrack = await Song.findById(id);

    if (trendingTrack) {
      if (trendingTrack.isTrending === false) {

        const added = await Song.findOneAndUpdate({ _id: id }, { isTrending: trendingTrack.isTrending = true }, { new: true });
        return res.status(200).json({ status: true, message: "Trending track has been added." });
      }
      else {
        const remove = await Song.findOneAndUpdate({ _id: id }, { isTrending: trendingTrack.isTrending = false }, { new: true });
        return res.status(200).json({ status: true, message: "Trending track has been remove." });
      }
    }
    else {
      return res.status(404).json({ status: true, message: "No Track Found." });
    }

  });
