import loginUser from "../../controller/loginController.js";

export default async function (fastify, opts) {
  const loginOptions = {
    schema: {},
    handler: loginUser,
  };
  fastify.post("/login", loginOptions);
}
