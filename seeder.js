import { envConfig } from "#utils/env";
import {User} from "#models/UserModel/user"
import bcrypt from "bcryptjs";
import connectDB from "#config/db";
import { ArtistComments } from "#models/CommentsModel/artist_comments";
import {Artist} from "#models/ArtistModel/artist";
import {Playlist} from "#models/PlayListModel/playlist";
import {Album} from "#models/AlbumModel/album";
import {AlbumComments} from "#models/CommentsModel/album_comments";
import {PlaylistComments} from "#models/CommentsModel/playlist_comments";
import {Genre} from "#models/GenreModel/genre";
import {Listener} from "#models/ListenerModel/listener";
import {Shares} from "#models/SharesModel/shares";
import {Song} from "#models/SongModel/song";
import {Likes} from "#models/LikesModel/likes";
import {Follow} from "#models/FollowsModel/follows";
import {TrackComments} from "#models/CommentsModel/track_comments";

envConfig();
connectDB();

const importData = async () => {
    try {
        const adminUser = await new User({
            name: 'Amigo',
            email: 'amigo@gmail.com',
            password: bcrypt.hashSync('12345678', 10),
            role: 'admin',
        }).save();
        
        await new User({
            name: 'Amigo',
            email: 'expertmaster30@gmail.com',
            password: bcrypt.hashSync('12345678', 10),
            role: 'admin',
        }).save();

        console.log('Data Imported!');
        process.exit();
    }
     catch (e) {
        console.log(`Error: ${e}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await ArtistComments.deleteMany();
        await User.deleteMany();
        await Artist.deleteMany();
        await Playlist.deleteMany();
        await Album.deleteMany();
        await AlbumComments.deleteMany()
        await PlaylistComments.deleteMany();
        await Genre.deleteMany();
        await Listener.deleteMany();
        await Shares.deleteMany()
        await Song.deleteMany();
        await Likes.deleteMany();
        await Follow.deleteMany();
        await TrackComments.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (e) {
        console.log(`Error: ${e}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d')
    destroyData();
else
    importData();