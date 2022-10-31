import error from "#middlewares/error";
import * as path from "path";
import { fileURLToPath } from "url";

import UserRoutes from "#routes/UserRoutes/user_route";
import ArtistRoutes from "#routes/ArtistRoutes/artist_route";
import AlbumRoutes from "#routes/AlbumRoutes/album_route";
import albumTrackRoute from "#routes/AlbumTrackRoutes/albumTrack_route";
import TrackRoute from "#routes/TrackRoutes/track_route";
import PlaylistTrackRoute from "#routes/PlaylistTrackRoutes/playlistTrack_route";
import PlaylistRoute from "#routes/PlaylistRoutes/playlist_route";
import PerformOnSong from "#routes/PerformOnSongRoutes/performOnSong_route";
import LikesRoute from "#routes/LikesRoutes/likes_route";
import SharesRoute from "#routes/SharesRoutes/shares_route";
import GenreRoute from "#routes/GenreRoutes/genre_route";
import ListenerRoute from "#routes/ListenerRoutes/listeners_route";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const routes = (app) => {
  app.use("/user/reset", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../controllers/UserController/resetPassword.html")
    );
  });

  //User
  app.use("/api", UserRoutes);

  //Artist
  app.use("/api", ArtistRoutes);

  //Album
  app.use("/api", AlbumRoutes);

  //AlbumTrack
  app.use("/api", albumTrackRoute);

  //Track
  app.use("/api", TrackRoute);

  //PlaylistTrack
  app.use("/api", PlaylistTrackRoute);

  //Playlist
  app.use("/api", PlaylistRoute);

  //PerformOnSong
  app.use("/api", PerformOnSong);

  //Likes
  app.use("/api", LikesRoute);

  //Shares
  app.use("/api", SharesRoute);

  //Genre
  app.use("/api", GenreRoute);

  //Listener
  app.use("/api", ListenerRoute);


  app.use(error);
};

export default routes;
