const signUpHandler = async (req, reply) => {
  try {
    const user = await req.server.users.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.server.transporter.sendMail({
      from: "shibaaadhikari0@gmail.com",
      to: user.email,
      subject: "Registration Successful",
      html: `<html>
      <body>
      <p>Hi ${user.username},</p>
        <h2>Sign In Successful!</h2>
        <p> Welcome to my blog.Thanks for signing up.</p>
      </body>
      
      <\html>`,
    });
    // const { users } = req.server;
    // const newUser = await users.create(req.body);

    // req.server.transporter.sendMail({
    //   from:"shibaaadhikari0@gmail.com",
    //   to:user
    // })

    // const emailOptions = {
    //   from: "shibaaadhikari0@gmail.com",
    //   to: user.email,
    //   subject: "Registration Successful",
    //   text: "Thank you for registering on our website",
    // };

    // await req.server.sendEmail(emailOptions);

    await reply.redirect("/user/login", {
      message: "User created successfully.Please login to continue",
    });
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
