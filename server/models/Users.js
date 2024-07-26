// models/User.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  settings: {
    workDuration: { type: Number, default: 25 },
    breakDuration: { type: Number, default: 5 },
  },
  sessions: [{ type: Schema.Types.ObjectId, ref: "Session" }],
});

module.exports = mongoose.model("User", UserSchema);
