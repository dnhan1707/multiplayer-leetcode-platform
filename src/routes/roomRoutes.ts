import { Router } from "express";
import { RoomService } from "../services/roomService";
import { RoomController } from "../controllers/roomController";
import { Server } from "socket.io";
import authMiddleware from "../middleware/authMiddleware";

// Export a function that takes io as a parameter
export const roomRoutes = (io: Server) => {
    const router = Router();
    const roomService = new RoomService();
    const roomController = new RoomController(roomService, io);

    // Protected routes
    router.post("/rooms", authMiddleware, roomController.createRoom);
    router.post("/rooms/:id", authMiddleware, roomController.joinRoom);
    router.put("/rooms/:id", authMiddleware, roomController.updateRoom);
    router.delete("/rooms/:id", authMiddleware, roomController.removeRoom);

    // Public routes
    router.get("/rooms", roomController.getRooms);
    router.get("/rooms/:id", roomController.getRoomById);

    return router;
};