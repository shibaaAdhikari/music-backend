import fastifyPlugin from "fastify-plugin";
import fastifyView from "@fastify/view";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
const templatesFolder = "templates";
const __filename = fileURLToPath(import.meta.url);

export default fastifyPlugin(async function (fastify, optns) {
  fastify.register(fastifyView, {
    engine: {
      ejs: ejs,
    },
    includeViewExtension: true,
    templates: templatesFolder,
    layout: "layout.ejs",
  });
});
