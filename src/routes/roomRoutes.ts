import { Router } from "express";
import { RoomService } from "../services/roomService";
import { RoomController } from "../controllers/roomController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();
const roomService = new RoomService();
const roomController = new RoomController(roomService);

// Protect only the routes that require authentication
router.post("/rooms", authMiddleware, roomController.createRoom);
router.put("/rooms/:id", authMiddleware, roomController.updateRoom);
router.delete("/rooms/:id", authMiddleware, roomController.removeRoom);

// Publicly accessible routes
router.post("/rooms/:id", roomController.joinRoom);
router.get("/rooms", roomController.getRooms);
router.get("/rooms/:id", roomController.getRoomById);

export const roomRoutes = router;
