const jwt = require("jsonwebtoken");
const User = require("../models/Users");
const config = require("../config");

const authMiddleware = async (req, res, next) => {
  const token = req.header("x-auth-token");
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = authMiddleware;
