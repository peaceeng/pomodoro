// routes/sessions.js
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");
const Session = require("../models/Sessions");
const config = require("../config");

const router = express.Router();

// Middleware to authenticate token
const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send("Invalid token.");
  }
};

// Start a session
router.post("/", auth, async (req, res) => {
  const { startTime, endTime, description } = req.body;

  try {
    const session = new Session({
      user: req.user.id,
      startTime,
      endTime,
      description,
    });
    await session.save();
    res.status(201).json(session);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Retrieve session history
router.get("/", auth, async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user.id });
    res.json(sessions);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
