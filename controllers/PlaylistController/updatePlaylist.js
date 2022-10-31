import {Playlist , validate} from "#models/PlayListModel/playlist"
import _ from "lodash";
import asyncHandler from "#middlewares/asyncHandler";
import {User} from "#models/UserModel/user"

//@desc  update Playlist
//@route  /playlist/update/:id
//@request Put Request
//@acess  public

export const updatePlaylist = asyncHandler(async (req, res) => {

    const user= await User.findById(req.body.userId);
    if (!user) {
      return res.status(404).json({ status: false, message: "User record not found" })
    }
  
    const update = await Playlist.findByIdAndUpdate(req.params.id,{$set : {...req.body,image : `uploads/${req.file?.filename}`}})

    return res.status(200).json({ status: true, message: "Playlist updated successfully" })

})