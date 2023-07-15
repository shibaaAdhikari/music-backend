import * as path from "path";

const imageController = async (request, reply) => {
  const { imageHash } = request.params;
  const currentPath = path.resolve("uploads/images", imageHash);
  reply.sendFile(currentPath);
};

export default imageController;
