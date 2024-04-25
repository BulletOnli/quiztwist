import http from "http";
import express from "express";
import { Server } from "socket.io";
import cors from "cors";

const port = process.env.PORT || 3005;

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: any) => {
  console.log("A user connected");

  // Handle chat messages
  socket.on("chat message", (message: any) => {
    io.emit("chat message", message); // Broadcast the message to all connected clients
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(port, () => {
  console.log(`WebSocket server listening on port ${port}`);
});
