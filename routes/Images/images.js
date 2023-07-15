import imageController from "../../controller/imageController.js";

export default async function (fastify, opts) {
  const imageOptions = {
    schema: {},
    handler: imageController,
  };

  fastify.get("/uploads/images/:imageHash", imageOptions);
}
