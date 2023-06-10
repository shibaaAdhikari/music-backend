import fastifyPlugin from "fastify-plugin";
import nodemailer from "nodemailer";

export default fastifyPlugin(async function (fastify, options) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "shibaaadhikari147@gmail.com",
      pass: "eng7lish",
    },
  });
  transporter.verify().then(() => {
    console.log("Ready for send emails");
  });

  fastify.decorate("transporter", transporter);
});
