const postsartistHandler = async (req, reply) => {
  try {
    const { artist_name } = req.body;
    const artist = await req.server.Artist.create({ artist_name });
    reply.code(201).send({ artist });
  } catch (err) {
    console.error(err);
    reply.code(500).send({ error: "Internal Server Error", err });
  }
};

const getAllArtistsHandler = async (req, reply) => {
  try {
    const artists = await req.server.Artist.findAll();
    reply.code(200).send({ artists });
  } catch (err) {
    console.error(err);
    reply.code(500).send({ error: "Internal Server Error", err });
  }
};

const deleteArtistHandler = async (req, reply) => {
  try {
    const { artist_id } = req.params;
    await req.server.Artist.destroy({ where: { artist_id } });
    reply.code(200).send({ message: "Artist deleted successfully" });
  } catch (err) {
    console.error(err);
    reply.code(500).send({ error: "Internal Server Error", err });
  }
};

const updateArtistHandler = async (req, reply) => {
  try {
    const { artist_id } = req.params;
    const { artist_name } = req.body;
    await req.server.Artist.update({ artist_name }, { where: { artist_id } });
    reply.code(200).send({ message: "Artist updated successfully" });
  } catch (err) {
    console.error(err);
    reply.code(500).send({ error: "Internal Server Error", err });
  }
};

export {
  postsartistHandler,
  getAllArtistsHandler,
  deleteArtistHandler,
  updateArtistHandler,
};
