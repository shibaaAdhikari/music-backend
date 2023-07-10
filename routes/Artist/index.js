import {
  postsartistHandler,
  getAllArtistsHandler,
  deleteArtistHandler,
  updateArtistHandler,
} from "../../controller/artistController.js";

export default async function (fastify, opts) {
  const createArtistOptions = {
    schema: {},
    handler: postsartistHandler,
  };

  const getAllArtistsOptions = {
    schema: {},
    handler: getAllArtistsHandler,
  };

  const deleteArtistOptions = {
    schema: {},
    handler: deleteArtistHandler,
  };

  const updateArtistOptions = {
    schema: {},
    handler: updateArtistHandler,
  };

  fastify.post("/artist", createArtistOptions);
  fastify.get("/artist", getAllArtistsOptions);
  fastify.delete("/artist/:artist_id", deleteArtistOptions);
  fastify.put("/artist/:artist_id", updateArtistOptions);
}
