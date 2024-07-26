const Session = require("../models/Session");

const startSession = async (req, res) => {
  const { user, startTime, endTime, taskDescription } = req.body;
  const session = new Session({ user, startTime, endTime, taskDescription });

  if (await session.save()) {
    res.status(201).json(session);
  } else {
    res.status(400).json({ message: "Invalid session data" });
  }
};

const getSessions = async (req, res) => {
  const sessions = await Session.find({ user: req.user.id });
  res.json(sessions);
};

module.exports = { startSession, getSessions };
