const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class PostService {
  async getAll() {
    try {
      const posts = await prisma.posts.findMany();
      return posts;
    } catch (error) {
      throw new Error("Get All Error Message");
    }
  }
  async getUserPosts(id) {
    try {
      const posts = await prisma.posts.findMany({
        where: {
          authorId: id,
        },
      });
      return posts;
    } catch (error) {
      throw new Error("Get User Posts Error Message");
    }
  }
  async getOne(id) {
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
    return {
      post,
      author,
    };
  }

  async createPost(title, text, id) {
    try {
      const post = await prisma.posts.create({
        data: {
          title,
          text,
          authorId: id,
        },
      });
      // send mail
      const users = await prisma.users.findMany();
      const mails = users.map((m) => m.email);
      //   await mailService.sendMail(mails, post);
      return post;
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async editPost(id, post) {
    const updateUser = await prisma.posts.update({
      where: {
        id: +id,
      },
      data: {
        title: post.title,
        text: post.text,
        updatedAt: new Date(),
      },
    });
    return updateUser;
  }
  async deletePost(id) {
    try {
      const postToDelete = await prisma.posts.delete({
        where: {
          id: +id,
        },
      });
      return postToDelete;
    } catch (error) {
      throw new Error("Post to delete doesnt exist");
    }
  }
}

module.exports = new PostService();
