const Router = require("express").Router;
const PostController = require("../controllers/PostController");
const authMiddleware = require("../middleware/auth-middleware");
const router = Router();

// get posts
router.get("/posts", async (req, res) => {
  const posts = await prisma.posts.findMany();
  res.status(200).json(posts);
});

router.post("/posts", authMiddleware, PostController.createPost);
router.put("/posts/:id", authMiddleware, PostController.editPost);
router.delete("/posts/:id", authMiddleware, PostController.deletePost);

module.exports = router;
