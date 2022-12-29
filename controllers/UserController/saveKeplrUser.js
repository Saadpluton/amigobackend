/**
 @desc  User Create with Keplr Account
 @route  POST /user/keplr
 @access  public
 */
import {User} from "#models/UserModel/user";
import {Artist} from "#models/ArtistModel/artist";
import asyncHandler from "#middlewares/asyncHandler";

const saveKeplrUser = asyncHandler(async (req, res) => {
    const {name, role, address} = req.body;

    if (!name || !role || !address) {
        return res
            .status(400)
            .send('Invalid params name, role and address is required')
    }

    if (role === 'artist') {
        const isUserExist = await Artist.findOne({address});

        if (isUserExist) {
            return res.status(409).json({status: false, message: "User already exist"})
        }

        const artist = await new Artist({name, role, address}).save();
        const token = artist?.generateAuthToken();

        return res.status(201).send({status: true, user: artist, token});
    }
    else {
        const isUserExist = await User.findOne({address});

        if (isUserExist) {
            return res.status(409).json({status: false, message: "User already exist"})
        }

        const user = await new User({name, role, address}).save();
        const token = user?.generateAuthToken();

        return res.status(201).send({status: true, user, token});
    }
});


export default saveKeplrUser