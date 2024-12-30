import { Router } from "express";
import { RoomService } from "../services/roomService";
import { RoomController } from "../controllers/roomController";


const router = Router();
const roomService = new RoomService();
const roomController = new RoomController(roomService);

router.post("/rooms", roomController.createRoom);

export const roomRoutes = router;
