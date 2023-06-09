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
    const user = await req.server.user.findOne({
      where: { username: req.body.username },
    });

    if (user.password === req.body.password) {
      reply.code(200).send({ msg: "Logged in successfully" });
      reply.redirect("/blogs/blogs");
    } else {
      reply.code(401).send({ msg: "Incorrect password" });
    }
  } catch (err) {
    console.log(err);
  }
};

export { signUpHandler, signInHandler };
