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
  });

  await users
    .sync({ force: false })
    .then(() => {
      console.log("user table created successfully");
    })
    .catch((error) => {
      console.log(error);
    });

  fastify.decorate("users", users);
});
