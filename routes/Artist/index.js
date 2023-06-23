import { postsartistHandler } from "../../controller/artistController.js";

export default async function (fastify, opts) {
  const createartistOptns = {
    schema: {},
    handler: postsartistHandler,
  };

  fastify.post("/artist", createartistOptns);
}
