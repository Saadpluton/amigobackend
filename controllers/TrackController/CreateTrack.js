import { Song, validate } from "#models/SongModel/song";
import _ from "lodash";
import asyncHandler from "#middlewares/asyncHandler";
import { PNG, JPG, JPEG, MP3, MPEG, PATH } from "#constant/constant";
import { Artist } from "#models/ArtistModel/artist";
import fs from "fs";
import musicData from "musicmetadata";
import mongoose from "mongoose";
import {User } from "#models/UserModel/user"

//@desc  Track Create
//@route  /track
//@request Post Request
//@acess  public

export const createTrack = asyncHandler(async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res
      .status(400)
      .send({ status: false, message: error?.details[0]?.message });
  }
  if (!mongoose.Types.ObjectId.isValid(req.body.artistId)) {
    return res.status(400).send({ status: false, message: 'Invalid artist ID.' });
  }
  const artist = await Artist.findById(req.body?.artistId);

  const admin = await User.findById(req.body?.userId);

  if (!artist || admin.role !== "admin") {
    return res
      .status(200)
      .json({ status: true, message: "artist record not found" });
  }

  let file = req.files?.image?.[0];
  let audio = req.files?.audio?.[0];

  if (!file?.filename) {
    return res
      .status(400)
      .json({ status: false, message: "Please Select the Image" });
  }

  if (!audio?.filename) {
    return res
      .status(400)
      .json({ status: false, message: "Please Select the audio" });
  }

  if (![PNG, JPEG, JPG].includes(file?.mimetype)) {
    return res.status(400).json({
      status: false,
      message: "Upload image type should be jpg, jpeg, png",
    });
  }
  if (![MP3, MPEG].includes(audio?.mimetype)) {
    return res.status(400).json({
      status: false,
      message: "Upload audio type should be mp3, mpeg",
    });
  }

  let parser = musicData(
    fs.createReadStream(`uploads/${audio?.filename}`),
    { duration: true },
    function (err, metadata) {
      let fixedCurrentTime;
      let duration = 0;
      if (err) {
        console.log("err:", err);
      } else {
        duration = metadata.duration;

        //console.log(duration);

        var seconds = duration % 60;
        var foo = duration - seconds;
        var minutes = foo / 60;
        var hour = Math.floor(minutes / 60);

        if (seconds < 10) {
          seconds = "0" + seconds.toString();
        }

        if (hour > 0) {
          fixedCurrentTime = hour + ":" + minutes + ":" + seconds;
        } else {
          fixedCurrentTime = minutes + ":" + seconds;
        }
        //console.log(fixedCurrentTime);

        let song = new Song(req.body);

        const name = artist?.name ? artist?.name : "Unknown"
        song.artistName = name;
        song.duration = fixedCurrentTime;
        song.image = `${PATH}uploads/${file?.filename}`;
        song.audio = `${PATH}uploads/${audio?.filename}`;
        song = song.save();

      }
    }
  );


  const updateTrack = await Artist.findOneAndUpdate({ _id: req.body.artistId }, { $push: { genre: req.body.genre, subGenre: req.body.subGenre } })

  return res
    .status(201)
    .json({ status: true, message: "Track created successfully" });
});
