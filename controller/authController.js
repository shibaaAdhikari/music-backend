const signUpHandler = async (req, reply) => {
  try {
    const user = await req.server.users.create(req.body);
    reply.redirect("/user/login");
  } catch (err) {
    console.log(err);
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
    console.log(err);
  }
};

export { signUpHandler, signInHandler };
