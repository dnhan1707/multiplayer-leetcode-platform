import { Router } from "express";
import { RoomService } from "../services/roomService";
import { RoomController } from "../controllers/roomController";


const router = Router();
const roomService = new RoomService();
const roomController = new RoomController(roomService);

router.post("/rooms", roomController.createRoom);
router.get("/rooms", roomController.getRooms);
router.get("/rooms/:id", roomController.getRoomById);
router.put("/rooms/:id", roomController.updateRoom);
router.delete("/rooms/:id", roomController.removeRoom);

export const roomRoutes = router;
