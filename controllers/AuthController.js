class AuthController {
  async signUp(req, res, next) {
    try {
      res.json({
        message: "Signup successful",
        user: req.user,
      });
    } catch (error) {
      res.json(error);
    }
  }
}

module.exports = new AuthController();
