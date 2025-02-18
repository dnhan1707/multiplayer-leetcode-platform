import app from "./app";
import { sequelize, testConnection } from "./config/database";
import { createServer } from "http";
import { setupSocket } from "./socket/socket";
import { roomRoutes } from "./routes/roomRoutes";
import { roomParticipantRoutes } from "./routes/roomParticipantRoutes";

async function startServer() {
    try {
        const PORT = process.env.PORT || 4000;

        // Create HTTP server
        const httpServer = createServer(app);

        // Setup Socket.IO
        const io = setupSocket(httpServer);

        // Setup routes with io instance
        app.use('/', roomRoutes(io));
        app.use('/', roomParticipantRoutes(io));

        // Database connection
        await sequelize.sync();
        await testConnection();
        console.log("Database synchronized");

        // Start server
        httpServer.listen(PORT, () => {
            console.log(`Server ready at http://localhost:${PORT}`);
        });

    } catch (err) {
        console.error("Failed to start server:", err);
        process.exit(1);
    }
}

startServer();