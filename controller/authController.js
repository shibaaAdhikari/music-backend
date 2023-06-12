import { renderFile } from "ejs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const signUpHandler = async (req, reply) => {
  try {
    const user = await req.server.users.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    const moduleURL = import.meta.url;
    const modulePath = dirname(fileURLToPath(moduleURL));
    const templatePath = path.join(
      modulePath,
      "..",
      "template",
      "emailTemplate.ejs"
    );

    const emailTemplate = await renderFile(templatePath, user.username);

    try {
      await req.server.transporter.sendMail({
        from: "shibaaadhikari0@gmail.com",
        to: user.email,
        subject: "Registration Successful",
        html: emailTemplate,
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
