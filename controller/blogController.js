export const getsBlogsHandler = async (req, reply) => {
  try {
    const blogs = await req.server.users.findAll();
    await reply.code(200).view("/blogs.ejs", { blogs });
  } catch (err) {
    console.log(err);
  }
};

export const postBlogsHandler = async (req, reply) => {
  try {
    const blog = await req.server.blog.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    reply.redirect("/register");
  } catch (err) {
    console.log(err);
  }
};

export const deleteBlogsHandler = async (req, reply) => {
  try {
    const userId = req.params.userId;
    const deletedUser = await req.server.users.destroy({ where: { userId } });
    if (deletedUser) {
      reply.code(200).send({ message: "User deleted successfully" });
    } else {
      reply.code(404).send({ message: "User not found" });
    }
  } catch (error) {
    reply.code(500).send({ message: "Internal server error" });
  }
};

export const updateBlogsHandler = async (req, reply) => {
  try {
    const { id, username, email, password } = req.body;

    // Find the user by userId in the database
    const user = await req.server.users.findOne({ where: { userId: id } });
    if (!user) {
      return reply.code(404).send({ message: "User not found" });
    }

    // Update the user's attributes
    user.username = username;
    user.email = email;
    user.password = password;

    // Save the updated user
    await user.save();

    reply.code(200).send({ message: "User updated successfully" });
  } catch (error) {
    throw new Error(error);
  }
};
