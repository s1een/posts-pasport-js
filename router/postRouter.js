const Router = require("express").Router;
const { PrismaClient } = require("@prisma/client");
const PostController = require("../controllers/PostController");
const prisma = new PrismaClient();
const router = Router();

router.get("/", PostController.getAll);
router.get("/:id", PostController.getOne);
module.exports = router;
