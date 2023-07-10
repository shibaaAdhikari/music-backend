const createGenreHandler = async (req, reply) => {
  try {
    const { genre_name } = req.body;
    const genre = await req.server.Genre.create({ genre_name });
    reply.code(201).send({ genre });
  } catch (err) {
    console.error(err);
    reply.code(500).send({ error: "Internal Server Error", err });
  }
};

const getAllGenresHandler = async (req, reply) => {
  try {
    const genres = await req.server.Genre.findAll();
    reply.code(200).send({ genres });
  } catch (err) {
    console.error(err);
    reply.code(500).send({ error: "Internal Server Error", err });
  }
};

const deleteGenreHandler = async (req, reply) => {
  try {
    const { genre_id } = req.params;
    await req.server.Genre.destroy({ where: { genre_id } });
    reply.code(200).send({ message: "Genre deleted successfully" });
  } catch (err) {
    console.error(err);
    reply.code(500).send({ error: "Internal Server Error", err });
  }
};

const updateGenreHandler = async (req, reply) => {
  try {
    const { genre_id } = req.params;
    const { genre_name } = req.body;
    await req.server.Genre.update({ genre_name }, { where: { genre_id } });
    reply.code(200).send({ message: "Genre updated successfully" });
  } catch (err) {
    console.error(err);
    reply.code(500).send({ error: "Internal Server Error", err });
  }
};

export {
  createGenreHandler,
  getAllGenresHandler,
  deleteGenreHandler,
  updateGenreHandler,
};
