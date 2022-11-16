import {Playlist , validate} from "#models/PlayListModel/playlist"
import _ from "lodash";
import asyncHandler from "#middlewares/asyncHandler";
import {User} from "#models/UserModel/user"
import { Artist } from "#models/ArtistModel/artist"
import mongoose from "mongoose";

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
    if(req.body.userId)
    {
    if (!mongoose.Types.ObjectId.isValid(req.body.userId))
    {
    return res.status(400).send( {status : false , message : 'Invalid user ID.'}); 
    }
  }
    if(req.body.artistId)
    {
      if (!mongoose.Types.ObjectId.isValid(req.body.artistId))
      {
      return res.status(400).send( {status : false , message : 'Invalid artist ID.'}); 
      } 
  
    }
   
    const user= await User.findById(req.body.userId);
  
    const artist= await Artist.findById(req.body.artistId);
  
    if (!artist && req.body.artistId) {
      return res.status(200).json({ status: true, message: "Artist record not found" })
    }
    
    if (!user && req.body.userId) {
      return res.status(200).json({ status: true, message: "User record not found" })
    }
   if(user || artist)
   {
    let playlists = new Playlist(_.pick(req.body , ['title','userId','genre','description','artistId','privacy']))

    playlists = await playlists.save();

    return res.status(201).json({ status: true, message: "Playlist created successfully" })
   }
   else{
    return res.status(200).json({ status: true, message: "Required user or artist field" })
 
   }
    
  })
  