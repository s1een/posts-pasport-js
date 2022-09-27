const Router = require("express").Router;
const PostController = require("../controllers/PostController");
const router = Router();

router.get("/", PostController.getAll);
router.get("/:id", PostController.getOne);
module.exports = router;
