import {
  createGenreHandler,
  getAllGenresHandler,
  deleteGenreHandler,
  updateGenreHandler,
} from "../../controller/genrneController.js";

export default async function (fastify, opts) {
  const createGenreOptions = {
    schema: {},
    handler: createGenreHandler,
  };

  const getAllGenresOptions = {
    schema: {},
    handler: getAllGenresHandler,
  };

  const deleteGenreOptions = {
    schema: {},
    handler: deleteGenreHandler,
  };

  const updateGenreOptions = {
    schema: {},
    handler: updateGenreHandler,
  };

  fastify.post("/genre", createGenreOptions);
  fastify.get("/genre", getAllGenresOptions);
  fastify.delete("/genre/:genre_id", deleteGenreOptions);
  fastify.put("/genre/:genre_id", updateGenreOptions);
}
