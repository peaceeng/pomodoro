// models/Session.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  description: { type: String },
});

module.exports = mongoose.model("Session", SessionSchema);
