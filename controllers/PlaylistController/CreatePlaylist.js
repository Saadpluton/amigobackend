import {Playlist , validate} from "#models/PlayListModel/playlist"
import _ from "lodash";
import asyncHandler from "#middlewares/asyncHandler";
import {User} from "#models/UserModel/user"
import { Artist } from "#models/ArtistModel/artist"

//@desc  Playlist Create
//@route  /playlist
//@request Post Request
//@acess  public

export const createPlaylist = asyncHandler(async (req, res) => {

  
    const {error} = validate(req.body);

    if (error)
    {
      return res.status(200).send({status : false , message : error?.details[0]?.message});
    }
    
    const user= await User.findById(req.body.userId);
  
    const artist= await Artist.findById(req.body.artistId);
  
    if (!artist && req.body.artistId) {
      return res.status(200).json({ status: true, message: "Artist record not found" })
    }

    if (!user && req.body.userId) {
      return res.status(200).json({ status: true, message: "User record not found" })
    }
   
    let playlists = new Playlist(_.pick(req.body , ['title','userId','artistId','privacy']))

    playlists = await playlists.save();

    return res.status(201).json({ status: true, message: "Playlist created successfully" })

  })
  