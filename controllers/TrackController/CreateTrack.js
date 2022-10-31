import { Song, validate } from "#models/SongModel/song";
import _ from "lodash";
import asyncHandler from "#middlewares/asyncHandler";
// import { PNG, JPG, JPEG, MP3, MPEG } from "#constant/constant";
// import { Artist } from "#models/ArtistModel/artist";
// import fs from "fs";
// import musicData from "musicmetadata";

//@desc  Track Create
//@route  /track
//@request Post Request
//@acess  public

export const createTrack = asyncHandler(async (req, res) => {
  // const { error } = validate(req.body);

  // if (error) {
  //   return res
  //     .status(400)
  //     .send({ status: false, message: error?.details[0]?.message });
  // }

  // const artist = await Artist.findById(req.body.artistId);

  // if (!artist) {
  //   return res
  //     .status(404)
  //     .json({ status: false, message: "artist record not found" });
  // }

  // let file = req.files.image?.[0];
  // let audio = req.files?.audio?.[0];

  // if (!file?.filename) {
  //   return res
  //     .status(400)
  //     .json({ status: false, message: "Please Select the Image" });
  // }

  // if (!audio?.filename) {
  //   return res
  //     .status(400)
  //     .json({ status: false, message: "Please Select the audio" });
  // }

  // if (![PNG, JPEG, JPG].includes(file?.mimetype)) {
  //   return res.status(400).json({
  //     status: false,
  //     message: "Upload image type should be jpg, jpeg, png",
  //   });
  // }
  // if (![MP3, MPEG].includes(audio?.mimetype)) {
  //   return res.status(400).json({
  //     status: false,
  //     message: "Upload audio type should be mp3, mpeg",
  //   });
  // }

  // // const audic = new Audic(`uploads/${audio?.filename}`);

  // // await audic.play();

  // // audic.addEventListener("ended", () => {
  // //   audic.destroy();
  // // });

  // let parser = musicData(
  //   fs.createReadStream(`uploads/${audio?.filename}`),
  //   { duration: true },
  //   function (err, metadata) {
  //     let fixedCurrentTime;
  //     let duration = 0;
  //     if (err) {
  //       console.log("err:", err);
  //     } else {
  //       duration = metadata.duration;

  //       //console.log(duration);

  //       var seconds = duration % 60;
  //       var foo = duration - seconds;
  //       var minutes = foo / 60;
  //       var hour = Math.floor(minutes / 60);

  //       if (seconds < 10) {
  //         seconds = "0" + seconds.toString();
  //       }

  //       if (hour > 0) {
  //         fixedCurrentTime = hour + ":" + minutes + ":" + seconds;
  //       } else {
  //         fixedCurrentTime = minutes + ":" + seconds;
  //       }
  //       //console.log(fixedCurrentTime);

  //       let song = new Song(req.body);
  //       song.artistName = artist.name;

  //       song.duration = fixedCurrentTime;
  //       song.image = `uploads/${file?.filename}`;
  //       song.audio = `uploads/${audio?.filename}`;
  //       song = song.save();
  //     }
  //   }
  // );

  return res
    .status(201)
    .json({ status: true, message: "Song created successfully" });
});
