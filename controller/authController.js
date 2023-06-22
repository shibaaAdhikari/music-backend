import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import ejs from "ejs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const signUpHandler = async (req, reply) => {
  try {
    const user = await req.server.users.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    const emailTemplate = path.join(
      __dirname,
      "../templates/emailTemplate.ejs"
    );
    const template = await fs.readFile(emailTemplate, "utf-8");

    const compiledTemplate = ejs.render(template, {
      username: user.username,
    });

    try {
      await req.server.transporter.sendMail({
        from: "shibaaadhikari0@gmail.com",
        to: user.email,
        subject: "Registration Successful",
        html: compiledTemplate,
      });
    } catch (err) {
      console.error("Error sending email:", err);
    }

    await reply.redirect("/user/login", {
      message: "User created successfully. Please login to continue.",
    });
  } catch (err) {
    console.error(err);
  }
};

const signInHandler = async (req, reply) => {
  try { 
    const { users } = req.server;
    const { email, password } = req.body;

    const user = await users.findOne({
      where: { email },
    });

    if (!user) {
      return reply.code(401).send({ msg: "User not found" });
    }

    if (user.password === password) {
      reply.redirect("/blogs/blogs");
    } else {
      reply.code(401).send({ msg: "Incorrect password" });
    }
  } catch (err) {
    console.error(err);
  }
};

export { signUpHandler, signInHandler };
