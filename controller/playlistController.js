const getAllPlaylist = async (req, reply) => {
  try {
    const playlists = await req.server.Playlist.findAll();
    reply.code(200).send({ playlists });
  } catch (err) {
    console.error(err);
    reply.code(500).send({ error: "Internal Server Error", err });
  }
};

const postsplaylistHandler = async (req, reply) => {
  try {
    const { playlist_name } = req.body;
    const playlist = await req.server.Playlist.create({ playlist_name });
    reply.code(201).send({ playlist });
  } catch (err) {
    console.error(err);
    reply.code(500).send({ error: "Internal Server Error", err });
  }
};

const putplaylistHandler = async (req, reply) => {
  try {
    const { playlist_id } = req.params;
    const { playlist_name } = req.body;

    const playlist = await req.server.Playlist.findByPk(playlist_id);
    if (!playlist) {
      reply.code(404).send({ error: "Playlist not found" });
      return;
    }

    await playlist.update({ playlist_name });
    reply.code(200).send({ playlist });
  } catch (err) {
    console.error(err);
    reply.code(500).send({ error: "Internal Server Error", err });
  }
};

const deleteplaylistHandler = async (req, reply) => {
  try {
    const { playlist_id } = req.params;

    const playlist = await req.server.Playlist.findByPk(playlist_id);
    if (!playlist) {
      reply.code(404).send({ error: "Playlist not found" });
      return;
    }

    await playlist.destroy();
    reply.code(200).send({ message: "Playlist deleted successfully" });
  } catch (err) {
    console.error(err);
    reply.code(500).send({ error: "Internal Server Error", err });
  }
};

export {
  getAllPlaylist,
  postsplaylistHandler,
  putplaylistHandler,
  deleteplaylistHandler,
};
