import {
  signUpHandler,
  signInHandler,
} from "../../controller/authController.js";

export default async function (fastify, opts) {
  const signUpOpts = {
    schema: {
      body: {},
    },
    handler: signUpHandler,
  };

  const signInOpts = {
    schema: {
      body: {},
    },
    handler: signInHandler,
  };

  fastify.get("/login", async function (request, reply) {
    await reply.view("/login.ejs");
  });

  fastify.get("/register", async function (request, reply) {
    await reply.view("/register.ejs");
  });

  fastify.post("/login", signInOpts);

  fastify.post("/register", signUpOpts);
}
