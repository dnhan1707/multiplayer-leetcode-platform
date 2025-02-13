import { Server } from "socket.io";
import { Server as HTTPServer } from "http";

export function setupSocket(httpServer: HTTPServer) {
    const io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    io.on("connection", (socket) => {
        console.log("New client connected");

        socket.on("join_room", (data) => {
            console.log(`User joined room: ${data.roomCode}`);
            socket.join(data.roomCode);
        });

        socket.on("chatMessage", (data) => {
            socket.to(data.roomCode).emit("receive_message", {
                sender: data.sender,
                message: data.message
            });
            console.log('Message sent:', data);
        });

        socket.on("disconnect", () => {
            console.log("Client disconnected");
        });
    });

    return io;
}