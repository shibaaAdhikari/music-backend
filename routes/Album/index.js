import {
  createAlbumHandler,
  deleteAlbumHandler,
  updateAlbumHandler,
  getAllAlbumsHandler,
} from "../../controller/albumController.js";

export default async function (fastify, opts) {
  const createAlbumOptions = {
    schema: {},
    handler: createAlbumHandler,
  };

  const getAllAlbumsOptions = {
    schema: {},
    handler: getAllAlbumsHandler,
  };

  const deleteAlbumOptions = {
    schema: {},
    handler: deleteAlbumHandler,
  };

  const updateAlbumOptions = {
    schema: {},
    handler: updateAlbumHandler,
  };

  fastify.post("/album", createAlbumOptions);
  fastify.get("/album", getAllAlbumsOptions);
  fastify.delete("/album/:album_id", deleteAlbumOptions);
  fastify.put("/album/:album_id", updateAlbumOptions);
}
