export const getsBlogsHandler = async (req, reply) => {
  try {
    const blogs = await req.server.blog.findAll();
    await reply.code(200).view("/blogs.ejs", { blogs });
  } catch (err) {
    console.log(err);
  }
};

export const getUserById = async (req,reply)=>{

  
}