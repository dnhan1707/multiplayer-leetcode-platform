import { Server } from "socket.io"
import { createAdapter } from "@socket.io/postgres-adapter"
import { Pool } from "pg"


const pool = new Pool({
    host: process.env.POSTGRES_HOST || "localhost",
    port: parseInt(process.env.POSTGRES_PORT || "5433"),
    user: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "",
    database: process.env.POSTGRES_DB || "postgres" ,
})


export function setupSocketIO(server: any) {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        }
    })

    io.adapter(createAdapter(pool));

    io.on("connection", (socket) => {
        console.log("A user Connected");

        socket.on("joinRoom", (roomId) => {
            socket.join(roomId);
            console.log(`User joined room ${roomId}`)
        })

        socket.on("chatMessage", (roomId, message) => {
            io.to(roomId).emit("chatMessage", message);
        })

        socket.on("disconnect", () => {
            console.log("user disconnect")
        })
        
    })
}
