import fp from "fastify-plugin";
import { DataTypes } from "sequelize";
export default fp(async (fastify, opts) => {
  // starting for users
  const users = fastify.sequelize.define("users", {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  //  ending for users

  //  starting for playlist
  const Playlist = fastify.sequelize.define("Playlist", {
    playlist_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    playlist_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });
  // ending for playlist

  // starting for artist

  const Artist = fastify.sequelize.define("Artist", {
    artist_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    artist_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // ending for artist

  // starting for genre
  const Genre = fastify.sequelize.define("Genre", {
    genre_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    genre_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  // ending for genre

  // starting for Albumn
  const Album = fastify.sequelize.define("Album", {
    album_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    artist_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    album_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    release_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
  // Ending For Albumn

  // starting for song
  const Song = fastify.sequelize.define("Song", {
    song_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    artist_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    album_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    genre_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    song_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    release_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    lyrics: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    cover_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    play_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });
  // Ending for Song

  // relation with different tables
  users.hasMany(Playlist, { foreignKey: "userId" });
  Playlist.belongsTo(users, { foreignKey: "userId" });
  Song.belongsTo(Artist, { foreignKey: "artist_id" });
  Song.belongsTo(Album, { foreignKey: "album_id" });
  Song.belongsTo(Genre, { foreignKey: "genre_id" });
  Album.belongsTo(Artist, { foreignKey: "artist_id" });

  await users
    .sync({ force: false })
    .then(() => {
      console.log("user table created successfully");
    })
    .catch((error) => {
      console.log(error);
    });

  await Playlist.sync({ force: false })
    .then(() => {
      console.log("Playlist table created successfully");
    })
    .catch((error) => {
      console.log(error);
    });

  await Artist.sync({ force: false })
    .then(() => {
      console.log("Artist table created successfully");
    })
    .catch((error) => {
      console.log(error);
    });

  await Genre.sync({ force: false })
    .then(() => {
      console.log("Genre table created successfully");
    })
    .catch((error) => {
      console.log(error);
    });

  await Album.sync({ force: false })
    .then(() => {
      console.log("Album table created successfully");
    })
    .catch((error) => {
      console.log(error);
    });

  await Song.sync({ force: false })
    .then(() => {
      console.log("Song table created successfully");
    })
    .catch((error) => {
      console.log(error);
    });

  fastify.decorate("users", users);
  fastify.decorate("Playlist", Playlist);
  fastify.decorate("Artist", Artist);
  fastify.decorate("Genre", Genre);
  fastify.decorate("Album", Album);
  fastify.decorate("Song", Song);
});
