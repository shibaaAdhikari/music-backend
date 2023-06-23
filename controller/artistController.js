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

export { postsartistHandler };
