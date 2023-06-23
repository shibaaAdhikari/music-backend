import {
  postsplaylistHandler,
  putplaylistHandler,
  deleteplaylistHandler,
  getAllPlaylist,
} from "../../controller/playlistController.js";

export default async function (fastify, opts) {
  const getAllPlaylistOPtns = {
    schema: {},
    handler: getAllPlaylist,
  };

  const createPlaylistOptns = {
    schema: {},
    handler: postsplaylistHandler,
  };

  const updatePlaylistOptns = {
    schema: {},
    handler: putplaylistHandler,
  };

  const deletePlaylistOptns = {
    schema: {},
    handler: deleteplaylistHandler,
  };

  fastify.post("/playlist", createPlaylistOptns);
  fastify.put("/playlist/:playlist_id", updatePlaylistOptns);
  fastify.delete("/playlist/:playlist_id", deletePlaylistOptns);
  fastify.get("/playlist", getAllPlaylistOPtns);
}
