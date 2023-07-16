import * as path from "path";

const audioController = async (request, reply) => {
  const { audioHash } = request.params;
  const currentPath = path.resolve("uploads/audio", audioHash);
  reply.sendFile(currentPath);
};

export default audioController;
