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
            io.to(data.roomCode).emit("participantJoined");

        });

        socket.on("chatMessage", (data) => {
            socket.to(data.roomCode).emit("receive_message", {
                sender: data.sender,
                message: data.message
            });
            console.log('Message sent:', data);
        });

        socket.on("disconnect", () => {
            // Get the rooms this socket was in
            const rooms = Array.from(socket.rooms);
            rooms.forEach(room => {
              io.to(room).emit("participantLeft");
            });
          });

        socket.on("announceGameStarted", ({ roomCode, selectedProblem }) => {
            console.log("Game start announced:", { roomCode, selectedProblem }); // Debug log
            // Broadcast to all users in the room, including sender
            socket.to(roomCode).emit("announceGameStartedReceived", {
                roomCode,
                selectedProblem
            });
        });

        socket.on("progress_update", ({ roomCode, progress, username }) => {
            socket.to(roomCode).emit("progress_update_recieved", {
                roomCode,
                progress,
                username
            })
        })

        socket.on("game_lost", ({ roomCode, username }) => {
            // Broadcast to all users in the room
            io.to(roomCode).emit("game_lost_announcement", { username });
        });

        socket.on("game_winner", ({ roomCode, username }) => {
            // Broadcast to all users in the room
            io.to(roomCode).emit("game_winner_announcement", { 
              winner: username 
            });
        });
    });

    return io;
}