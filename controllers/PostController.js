const { PrismaClient } = require("@prisma/client");
const mailService = require("../service/mail-service");
const prisma = new PrismaClient();

class PostController {
  async getAll(req, res, next) {
    try {
      const posts = await prisma.posts.findMany();
      if (posts.length === 0) {
        res.render("posts.hbs", {
          empty: "No posts yet.",
        });
        return;
      }
      res.render("posts.hbs", {
        posts: posts,
      });
    } catch (error) {
      res.status(500).json("No Posts");
    }
  }
  async getUserPosts(req, res) {
    try {
      const { id } = req.params.id;
      const posts = await prisma.posts.findMany({
        where: {
          authorId: id,
        },
      });
      if (posts.length === 0) {
        res.render("posts.hbs", {
          empty: "No posts yet.",
        });
        return;
      }
      res.render("posts.hbs", {
        posts: posts,
      });
    } catch (error) {
      res.status(500).json("No Posts");
    }
  }
  async getOne(req, res) {
    const { id } = req.params;

    const post = await prisma.posts.findUnique({
      where: {
        id: +id,
      },
    });
    const author = await prisma.users.findUnique({
      where: {
        id: post.authorId,
      },
    });
    console.log(author);
    res.render("post.hbs", {
      title: post.title,
      text: post.text,
      author: author.email,
    });
  }

  async createPost(req, res) {
    const { title, text } = req.body;
    try {
      const post = await prisma.posts.create({
        data: {
          title,
          text,
          authorId: req.user.user.id,
        },
      });
      // send mail
      const users = await prisma.users.findMany();
      const mails = users.map((m) => m.email);
      await mailService.sendMail(mails, post);
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async editPost(req, res) {
    const { id } = req.params;
    const post = req.body;
    const updateUser = await prisma.posts.update({
      where: {
        id: +id,
      },
      data: {
        title: post.title,
        text: post.text,
      },
    });
    res.status(200).json(updateUser);
  }
  async deletePost(req, res) {
    try {
      const { id } = req.params;
      const postToDelete = await prisma.posts.delete({
        where: {
          id: +id,
        },
      });
      res.status(200).json(postToDelete);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = new PostController();
