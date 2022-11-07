import {Playlist , validate} from "#models/PlayListModel/playlist"
import _ from "lodash";
import asyncHandler from "#middlewares/asyncHandler";
import {User} from "#models/UserModel/user"

//@desc  Playlist Create
//@route  /playlist
//@request Post Request
//@acess  public

export const createPlaylist = asyncHandler(async (req, res) => {

  
    const {error} = validate(req.body);

    if (error)
    {
      return res.status(400).send({status : false , message : error?.details[0]?.message});
    }
    
    const user= await User.findById(req.body.userId);
  
    if (!user) {
      return res.status(404).json({ status: true, message: "User record not found" })
    }
   
    let playlists = new Playlist(_.pick(req.body , ['title','userId','privacy']))

    playlists = await playlists.save();

    return res.status(201).json({ status: true, message: "Playlist created successfully" })

  })
  