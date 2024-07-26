// routes/analytics.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Session = require("../models/Sessions");

router.get("/", auth, async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user.id });

    const totalSessions = sessions.length;
    const totalWorkMinutes = sessions.reduce(
      (acc, session) =>
        acc +
        Math.round(
          (new Date(session.endTime) - new Date(session.startTime)) / 60000
        ),
      0
    );

    res.json({ totalSessions, totalWorkMinutes });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
