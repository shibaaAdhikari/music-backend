import fastify from "fastify";

fastify.get("/test", (req, reply) => {
  reply.vi;
});
