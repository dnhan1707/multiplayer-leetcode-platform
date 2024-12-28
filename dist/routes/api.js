"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRoutes = void 0;
const express_1 = require("express");
const roomController_1 = require("../controller/roomController");
const router = (0, express_1.Router)();
// ================== ROOM API Routes ==================
router.post("/room/:size", roomController_1.generateRoom);
router.post("/room/:id/join", roomController_1.joinRoom);
router.get("/room/:id", roomController_1.getRoomDetails);
router.get("/room", roomController_1.getAllRooms);
router.delete("/room/:id", roomController_1.removeRoom);
router.put("/room/:id", roomController_1.updateRoom);
router.put("/room/:id/:socketid/:newName", roomController_1.updateUserNameInRoom);
exports.apiRoutes = router;
