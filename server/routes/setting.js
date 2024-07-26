// routes/settings.js
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");

const router = express.Router();

// Middleware to authenticate token
const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, "secretkey");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send("Invalid token.");
  }
};

// Update settings
router.put("/", auth, async (req, res) => {
  const { workDuration, breakDuration } = req.body;

  try {
    const user = await User.findById(req.user.id);
    user.settings.workDuration = workDuration;
    user.settings.breakDuration = breakDuration;
    await user.save();
    res.send("Settings updated");
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
