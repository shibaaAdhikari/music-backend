import * as path from "path";

const fileUploadController = async (request, reply) => {
  const { fileHash, fileType } = request.params;
  let currentPath;

  if (fileType === "audio") {
    currentPath = path.resolve("uploads/audio", fileHash);
  } else if (fileType === "image") {
    currentPath = path.resolve("uploads/images", fileHash);
  } else {
    // Handle invalid file types
    reply.code(400).send("Invalid file type");
    return;
  }

  reply.sendFile(currentPath);
};

export default fileUploadController;
