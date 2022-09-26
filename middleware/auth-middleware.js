const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res.status(500).json({ message: "No Auth Header" });
    }

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return res.status(500).json({ message: "Token doesnt exist" });
    }

    const userData = validateAccessToken(accessToken);
    if (!userData) {
      return res.status(500).json({ message: "Token not valid" });
    }

    req.user = userData;
    next();
  } catch (e) {
    return res.status(500).json({ message: e });
  }
};

function validateAccessToken(token) {
  const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  return userData;
}
