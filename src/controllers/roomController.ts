import { Request, Response } from "express";
import { RoomService } from "../services/roomService";

export class RoomController {
    constructor (private roomService: RoomService) {}
    createRoom = async (req: Request, res: Response) => {
        try {
            const dataFromRoomService = await this.roomService.createRoom(req.body);
            res.status(201).json({
                message: "Room created",
                data: dataFromRoomService
            });
        } catch (error) {
            res.status(500).json({message: "Failed to create room"});
        }
    }
}

