import { createUser } from "../../controller/signupController.js";

export default async function (fastify, opts) {
  const signupOptions = {
    schema: {},
    handler: createUser,
  };

  fastify.post("/signup", signupOptions);
}
