import error from "#middlewares/error";
import * as path from "path";
import { fileURLToPath } from "url";

import UserRoutes from "#routes/UserRoutes/user_route";
import ArtistRoutes from "#routes/ArtistRoutes/artist_route";
import AlbumRoutes from "#routes/AlbumRoutes/album_route";
import TrackRoute from "#routes/TrackRoutes/track_route";
import PlaylistRoute from "#routes/PlaylistRoutes/playlist_route";
import LikesRoute from "#routes/LikesRoutes/likes_route";
import SharesRoute from "#routes/SharesRoutes/shares_route";
import GenreRoute from "#routes/GenreRoutes/genre_route";
import ListenerRoute from "#routes/ListenerRoutes/listeners_route";
import CommentsRoute from "#routes/CommentsRoutes/comments_route";
import AdminRoute from "#routes/AdminRoutes/admin_route";


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

  //Track
  app.use("/api", TrackRoute);

  //Playlist
  app.use("/api", PlaylistRoute);

  //Likes
  app.use("/api", LikesRoute);

  //Shares
  app.use("/api", SharesRoute);

  //Genre
  app.use("/api", GenreRoute);

  //Listener
  app.use("/api", ListenerRoute);

  //Comments
  app.use("/api",CommentsRoute);
 
  //Admin
 app.use("/api",AdminRoute);

  app.use(error);
};

export default routes;
