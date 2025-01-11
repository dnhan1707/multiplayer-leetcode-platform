import app from "./app";
import { sequelize, testConnection } from "../server/config/database";
import { createServer } from "node:http";
import { Server } from "socket.io";

async function startServer() {
  try {
    const PORT = process.env.PORT || 4000;

    await sequelize.sync();
    await testConnection();
    console.log("Database synchronized");

    const server = createServer(app);

    const io = new Server(server, {
      cors: {
        origin: "*", // Update this to restrict access in production
        methods: ["GET", "POST"],
      }
    });

    io.on("connection", (socket) => {
      console.log("A user connected");

      socket.on("join_room", (data) => {
        console.log(`User ${data.userId} ---connect to-----${data.roomCode}`);
        socket.join(data.roomCode);
        console.log(`User ${data.userId} joined room ${data.roomCode}`);
      });

      socket.on("chatMessage", (data) => {
        console.log(`${data.roomCode}---received---${data.message}`);
        socket.to(data.roomCode).emit("receive_message", data);
        console.log(`Message sent to room ${data.roomCode}`);
      });

      socket.on("disconnect", () => {
        console.log("User disconnected");
      });
    });

    app.get("/", (req, res) => {
      try {
        res.status(200).json({ message: "Connected" });
      } catch (error) {
        res.status(500).json({ message: "Internal server error" });
      }
    });

    server.listen(PORT, () => {
      console.log(`Server ready at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log("Failed to start server:", err);
    process.exit(1);
  }
}

startServer();