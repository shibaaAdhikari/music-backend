import imageController from "../../controller/imageController.js";
import audioController from "../../controller/audioController.js";

export default async function (fastify, opts) {
  const imageOptions = {
    schema: {},
    handler: imageController,
  };

  const audioOptions = {
    schema: {},
    handler: audioController,
  };

  fastify.get("/uploads/images/:imageHash", imageOptions);
  fastify.get("/uploads/audio/:audioHash", audioOptions);
}
