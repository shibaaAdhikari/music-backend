// Create a new user
const createUser = async (req, reply) => {
  try {
    const { username, email, password, userType } = req.body;
    const user = await req.server.users.create({
      username,
      email,
      password,
      role: userType,
    });
    reply.code(201).send({ user });
  } catch (err) {
    console.error(err);
    reply.code(500).send({ error: "Internal Server Error", err });
  }
};

// Get all users
const getAllUsers = async (req, reply) => {
  try {
    const { userType } = req.query;
    const users = await req.server.users.findAll({ where: { role: userType } });
    reply.send({ users });
  } catch (err) {
    console.error(err);
    reply.code(500).send({ error: "Internal Server Error", err });
  }
};

// Get a user by ID
const getUserById = async (req, reply) => {
  try {
    const { userId } = req.params;
    const { userType } = req.query;
    const user = await req.server.users.findOne({
      where: { userId, role: userType },
    });
    if (!user) {
      reply.code(404).send({ message: "User not found" });
      return;
    }
    reply.send({ user });
  } catch (err) {
    console.error(err);
    reply.code(500).send({ error: "Internal Server Error", err });
  }
};

// Update a user
const updateUser = async (req, reply) => {
  try {
    const { userId } = req.params;
    const { username, email, password, userType } = req.body;
    const user = await req.server.users.findOne({
      where: { userId, role: userType },
    });
    if (!user) {
      reply.code(404).send({ message: "User not found" });
      return;
    }
    await user.update({ username, email, password });
    reply.send({ message: "User updated successfully" });
  } catch (err) {
    console.error(err);
    reply.code(500).send({ error: "Internal Server Error", err });
  }
};

// Delete a user
const deleteUser = async (req, reply) => {
  try {
    const { userId } = req.params;
    const { userType } = req.query;
    const user = await req.server.users.findOne({
      where: { userId, role: userType },
    });
    if (!user) {
      reply.code(404).send({ message: "User not found" });
      return;
    }
    await user.destroy();
    reply.send({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    reply.code(500).send({ error: "Internal Server Error", err });
  }
};

export { createUser, getAllUsers, getUserById, updateUser, deleteUser };
