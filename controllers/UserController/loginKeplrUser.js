import asyncHandler from "#middlewares/asyncHandler";
import {User} from "#models/UserModel/user";
import {Artist} from "#models/ArtistModel/artist";

const loginKeplrUser = asyncHandler(async (req, res) => {
    const address = req.body.address;

    if(!address) {
        return res.status(400).send(`Address field is required`)
    }

    const user = await User.findOne({address});
    const artist = await Artist.findOne({address})

    if(!user && !artist) {
        return res.status(200).send({status: false, message: `User does not exists with address ${address}`})
    }

    if(user) {
        const token = user?.generateAuthToken();
        return res.status(200).send({status: true, user, token});
    }else {
        const token = artist?.generateAuthToken();
        return res.status(200).send({status: true, user: artist, token});
    }
});

export default loginKeplrUser