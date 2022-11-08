import { Song } from "#models/SongModel/song";
import asyncHandler from "#middlewares/asyncHandler";
import _ from "lodash";
import { PNG, JPG, JPEG, MP3, MPEG, PATH } from "#constant/constant";
import { Artist } from "#models/ArtistModel/artist";
import fs from "fs";
import musicData from "musicmetadata";
import mongoose from "mongoose";


//@desc  update track
//@route  /track/update/:id
//@request Put Request
//@acess  public

export const updateTrack = asyncHandler(async (req, res) => {
  const song = await Song.findById(req.params.id);
  if (req.body.artistId) {
    if (!mongoose.Types.ObjectId.isValid(req.body.artistId)) {
      return res.status(400).send({ status: false, message: 'Invalid artist ID.' });
    }
  }
  if (!song) {
    return res
      .status(200)
      .json({ status: true, message: "track record not found" });
  }
  const artist = await Artist.findById(req.body.artistId);

  if (!artist && req.body.artistId) {
    return res
      .status(200)
      .json({ status: true, message: "artist record not found" });
  }

  let file = req.files?.image?.[0];
  let audio = req.files?.audio?.[0];

  if (![PNG, JPEG, JPG].includes(file?.mimetype) && file) {
    return res.status(400).json({
      status: false,
      message: "Upload image type should be jpg, jpeg, png",
    });
  }
  if (![MP3, MPEG].includes(audio?.mimetype) && audio) {
    return res.status(400).json({
      status: false,
      message: "Upload audio type should be mp3, mpeg",
    });
  }

  let image1 = req.files ? `${PATH}uploads/${file?.filename}` : undefined

  let audio1 = req.files ? `${PATH}uploads/${audio?.filename}` : undefined

  if (audio1) {
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

          const update = Song.findByIdAndUpdate(req.params.id, {
            $set: {
              ...req.body,
              duration: fixedCurrentTime,
              image: image1,
              audio: audio1,
            },
          }).then((res) => {
            if (res) {
              true;
            }
          });
        }
      }
    );

  }
  else {
    const update = Song.findByIdAndUpdate(req.params.id, {
      $set: {
        ...req.body,
        duration: fixedCurrentTime,
        image: image1,
      },
    })

  }
  return res
    .status(200)
    .json({ status: true, message: "Song updated successfully" });
});
