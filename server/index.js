const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const config = require("./config");
const mongoose = require("mongoose");
const auth = require("./middleware/auth");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // replace with your frontend URL
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  },
});

app.use(cors());

mongoose
  .connect(config.dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(express.json({ extended: false }));

app.use("/api/auth", require("./routes/auth"));
//app.use("/api/users", require("./routes/users"));
app.use("/api/sessions", require("./routes/session"));
app.use("/api/analytics", require("./routes/analytics"));

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("startSession", ({ userId, startTime }) => {
    io.emit("updateSession", { userId, startTime });
  });

  socket.on("stopSession", ({ userId, endTime }) => {
    io.emit("updateSession", { userId, endTime });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
