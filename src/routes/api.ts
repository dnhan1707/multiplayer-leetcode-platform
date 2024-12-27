import { Router } from "express";
import {
  generateRoom,
  joinRoom,
  getRoomDetails,
  getAllRooms,
  removeRoom,
  updateRoom,
  updateUserNameInRoom
} from "../controller/roomController";

const router = Router();

// ================== ROOM API Routes ==================

router.post("/room/:size", generateRoom);

router.post("/room/:id/join", joinRoom);

router.get("/room/:id", getRoomDetails);

router.get("/room", getAllRooms);

router.delete("/room/:id", removeRoom);

router.put("/room/:id", updateRoom);

router.put("/room/:id/:socketid/:newName", updateUserNameInRoom);

export const apiRoutes = router;