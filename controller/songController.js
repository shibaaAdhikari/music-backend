const createSongHandler = async (req, reply) => {
  try {
    const { artist_id, album_id, song_name, duration, release_date } = req.body;
    const song = await req.server.Song.create({
      artist_id,
      album_id,
      song_name,
      duration,
      release_date,
    });
    reply.code(201).send({ song });
  } catch (err) {
    console.error(err);
    reply.code(500).send({ error: "Internal Server Error", err });
  }
};

const getAllSongsHandler = async (req, reply) => {
  try {
    const songs = await req.server.Song.findAll();
    reply.code(200).send({ songs });
  } catch (err) {
    console.error(err);
    reply.code(500).send({ error: "Internal Server Error", err });
  }
};

const deleteSongHandler = async (req, reply) => {
  try {
    const { song_id } = req.params;
    await req.server.Song.destroy({ where: { song_id } });
    reply.code(200).send({ message: "Song deleted successfully" });
  } catch (err) {
    console.error(err);
    reply.code(500).send({ error: "Internal Server Error", err });
  }
};

const updateSongHandler = async (req, reply) => {
  try {
    const { song_id } = req.params;
    const { artist_id, album_id, song_name, duration, release_date } = req.body;
    await req.server.Song.update(
      { artist_id, album_id, song_name, duration, release_date },
      { where: { song_id } }
    );
    reply.code(200).send({ message: "Song updated successfully" });
  } catch (err) {
    console.error(err);
    reply.code(500).send({ error: "Internal Server Error", err });
  }
};

export {
  createSongHandler,
  getAllSongsHandler,
  deleteSongHandler,
  updateSongHandler,
};
