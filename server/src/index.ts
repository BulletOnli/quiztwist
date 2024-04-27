import http from "http";
import express from "express";
import { Server, Socket } from "socket.io";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

const port = process.env.PORT || 3007;

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
  })
);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: Socket) => {
  console.log(`A user connected: ${socket.id}`);

  // Handle chat messages
  socket.on("chat message", (message: string, roomId: string) => {
    socket.to(roomId).emit("receive message", message);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

mongoose.connect(process.env.MONGO_URI!).then(() => {
  console.log("Connected to Database");
});

server.listen(port, () => {
  console.log(`WebSocket server listening on port ${port}`);
});
