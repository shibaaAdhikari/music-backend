import fp from "fastify-plugin";
import { DataTypes } from "sequelize";
export default fp(async (fastify, opts) => {
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

  users.hasMany(Playlist, { foreignKey: "userId" });
  Playlist.belongsTo(users, { foreignKey: "userId" });

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
  fastify.decorate("users", users);
  fastify.decorate("Playlist", Playlist);
});
