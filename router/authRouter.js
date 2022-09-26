const passport = require("passport");
const jwt = require("jsonwebtoken");
const AuthController = require("../controllers/AuthController");
const Router = require("express").Router;
const router = Router();
router.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  AuthController.signUp
);

router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err) {
        const error = new Error("An error occurred.");
        return next(error);
      }
      if (!user) {
        res.status(400).json("User Not Exist");
        return;
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { id: user.id, email: user.email };
        const token = jwt.sign({ user: body }, process.env.JWT_ACCESS_SECRET);
        res.cookie("token", token, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        });
        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});
router.get("/logout", async (req, res, next) => {
  req.logout();
  res.redirect("/");
});
module.exports = router;
