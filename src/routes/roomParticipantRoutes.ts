import { Router } from "express";
import { RoomParticipantService } from "../services/roomParticipantService";
import { RoomParticipantController } from "../controllers/roomParticipantController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();
const roomParticipantService = new RoomParticipantService();
const roomParticipantController = new RoomParticipantController(roomParticipantService);

// Protect only the routes that require authentication
router.get("/roomParticipant/usernameWithRole/:roomCode", authMiddleware, roomParticipantController.getUserNameWithRole);
router.delete("/roomParticipant/leave/:roomCode", authMiddleware, roomParticipantController.deleteParticipantFromRoom);

export const roomParticipantRoutes = router;
