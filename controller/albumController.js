const createAlbumHandler = async (req, reply) => {
  try {
    const { artist_id, album_name, release_date } = req.body;
    const album = await req.server.Album.create({
      artist_id,
      album_name,
      release_date,
    });
    reply.code(201).send({ album });
  } catch (err) {
    console.error(err);
    reply.code(500).send({ error: "Internal Server Error", err });
  }
};

const getAllAlbumsHandler = async (req, reply) => {
  try {
    const albums = await req.server.Album.findAll();
    reply.code(200).send({ albums });
  } catch (err) {
    console.error(err);
    reply.code(500).send({ error: "Internal Server Error", err });
  }
};

const deleteAlbumHandler = async (req, reply) => {
  try {
    const { album_id } = req.params;
    await req.server.Album.destroy({ where: { album_id } });
    reply.code(200).send({ message: "Album deleted successfully" });
  } catch (err) {
    console.error(err);
    reply.code(500).send({ error: "Internal Server Error", err });
  }
};

const updateAlbumHandler = async (req, reply) => {
  try {
    const { album_id } = req.params;
    const { artist_id, album_name, release_date } = req.body;
    await req.server.Album.update(
      { artist_id, album_name, release_date },
      { where: { album_id } }
    );
    reply.code(200).send({ message: "Album updated successfully" });
  } catch (err) {
    console.error(err);
    reply.code(500).send({ error: "Internal Server Error", err });
  }
};

export {
  createAlbumHandler,
  getAllAlbumsHandler,
  deleteAlbumHandler,
  updateAlbumHandler,
};
