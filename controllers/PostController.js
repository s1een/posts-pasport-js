const postService = require("../service/PostService");

class PostController {
  async getAll(req, res, next) {
    try {
      const posts = await postService.getAll();
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
    const { post, author } = await postService.getOne(id);
    res.render("post.hbs", {
      title: post.title,
      text: post.text,
      author: author.email,
    });
  }

  async createPost(req, res) {
    const { title, text } = req.body;
    try {
      const post = await postService.createPost(title, text, req.user.user.id);
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async editPost(req, res) {
    const { id } = req.params;
    const post = req.body;
    const updateUser = await postService.editPost(id, post);
    res.status(200).json(updateUser);
  }
  async deletePost(req, res) {
    try {
      const { id } = req.params;
      const postToDelete = await postService.deletePost(id);
      res.status(200).json(postToDelete);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = new PostController();
