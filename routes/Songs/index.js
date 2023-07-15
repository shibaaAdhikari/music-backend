import {
  // createSongHandler,
  // getAllSongsHandler,
  // deleteSongHandler,
  // updateSongHandler,
  // uploadSong,
  createSong,
} from "../../controller/songController.js";

export default async function (fastify, opts) {
  const createSongOptions = {
    schema: {},
    handler: createSong,
  };

  // const getAllSongsOptions = {
  //   schema: {},
  //   handler: getAllSongsHandler,
  // };

  // const deleteSongOptions = {
  //   schema: {},
  //   handler: deleteSongHandler,
  // };

  // const updateSongOptions = {
  //   schema: {},
  //   handler: updateSongHandler,
  // };

  fastify.post("/song", createSongOptions);
  // fastify.get("/song", getAllSongsOptions);
  // fastify.delete("/song/:song_id", deleteSongOptions);
  // fastify.put("/song/:song_id", updateSongOptions);
}
