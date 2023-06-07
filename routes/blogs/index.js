import { getsBlogsHandler } from "../../controller/blogController.js";

export default async function (fastify, opts) {
  const getBlogsOptns = {
    schema: {},
    handler: getsBlogsHandler,
  };
  fastify.get("/blogs", async function (request, reply) {
    const users = await request.server.users.findAll();
    const mappedUsers = users.map((user) => user.dataValues);
    console.log(mappedUsers);
    await reply.view("/blogs.ejs", { mappedUsers: mappedUsers });
  });

  

  fastify.post("/blogs", getBlogsOptns);
}
