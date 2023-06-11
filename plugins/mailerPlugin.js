import fastifyPlugin from "fastify-plugin";
import nodemailer from "nodemailer";

export default fastifyPlugin(async function (fastify, options) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "shibaaadhikari0@gmail.com",
      pass: "sdpwlqswtlryvfxn",
    },
  });
  transporter.verify().then(() => {
    console.log("Ready for send emails");
  });

  fastify.decorate("transporter", transporter);
});
