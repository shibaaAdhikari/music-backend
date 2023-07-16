import * as path from "path";
import AutoLoad from "@fastify/autoload";
import { fileURLToPath } from "url";
import fastifyFormbody from "@fastify/formbody";
import fastifyCors from "@fastify/cors";
import fastifyMulter from "fastify-multer";
import { v4 as uuidv4 } from "uuid";
import fastifyMultipart from "fastify-multipart";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDirectory = "uploads";

// Create the upload directory if it doesn't exist
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Mime type maps for images and audio files
const IMAGE_MIME_TYPE_MAP = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  // Add more image mime types and their corresponding extensions if needed
};

const AUDIO_MIME_TYPE_MAP = {
  "audio/mpeg": "mp3",
  "audio/wav": "wav",
  // Add more audio mime types and their corresponding extensions if needed
};

// Set up the multer instances for image and audio uploads
const uploadImage = fastifyMulter.default({
  storage: fastifyMulter.diskStorage({
    destination: (req, file, callback) => {
      callback(null, path.join(uploadDirectory, "images"));
    },
    filename: (req, file, callback) => {
      const ext = IMAGE_MIME_TYPE_MAP[file.mimetype];
      if (!ext) {
        // Handle unsupported file types
        return callback(new Error("Invalid mime type"));
      }
      callback(null, uuidv4() + "." + ext);
    },
  }),
  fileFilter: (req, file, callback) => {
    const isValid = !!IMAGE_MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error("Invalid mime type");
    callback(error, isValid);
  },
});

const uploadAudio = fastifyMulter.default({
  storage: fastifyMulter.diskStorage({
    destination: (req, file, callback) => {
      callback(null, uploadDirectory);
    },
    filename: (req, file, callback) => {
      const ext = AUDIO_MIME_TYPE_MAP[file.mimetype];
      if (!ext) {
        // Handle unsupported file types
        return callback(new Error("Invalid mime type"));
      }
      callback(null, uuidv4() + "." + ext);
    },
  }),
  fileFilter: (req, file, callback) => {
    const isValid = !!AUDIO_MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error("Invalid mime type");
    callback(error, isValid);
  },
});

export default async function (fastify, opts) {
  fastify.register(fastifyMultipart); // Add this line to register the fastify-multipart plugin
  fastify.register(fastifyFormbody);

  // Enable CORS using the fastify-cors plugin
  fastify.register(fastifyCors, {
    origin: "*", // Allow requests from all origins
  });

  fastify.post(
    "/upload",
    { preHandler: uploadImage.single("file") },
    function (req, reply) {
      try {
        // Access the uploaded image file using req.file
        console.log(req.file);
        reply.code(200).send("Image upload successful");
      } catch (error) {
        console.error(error);
        reply.code(500).send("Internal Server Error");
      }
    }
  );

  // Audio upload route
  fastify.post(
    "/upload/audio",
    { preHandler: uploadAudio.single("file") },
    function (req, reply) {
      try {
        // Access the uploaded audio file using req.file
        console.log(req.file);
        reply.code(200).send("Audio upload successful");
      } catch (error) {
        console.error(error);
        reply.code(500).send("Internal Server Error");
      }
    }
  );

  // Load plugins and routes
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "plugins"),
    options: Object.assign({}, opts),
  });

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "Model"),
    options: Object.assign({}, opts),
  });

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    options: Object.assign({}, opts),
  });
}
