const loginController = async (req, reply) => {
    try {
      const { users } = req.server;
      const { username, password } = req.body;
  
      const user = await users.findOne({
        where: { username },
      });
  
      if (!user) {
        return reply.code(401).send({ msg: "User not found" });
      }
  
      if (user.password === password) {
        // Add your login logic here
        // For example, generate a token or set session data
        // and send a success response
        reply.send({ msg: "Login successful" });
      } else {
        reply.code(401).send({ msg: "Incorrect password" });
      }
    } catch (err) {
      console.error(err);
      reply.code(500).send({ error: "Internal Server Error", err });
    }
  };
  
  export default loginController;
  