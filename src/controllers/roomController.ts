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

    joinRoom = async (req: Request, res: Response) => {
        try {
            const dataFromRoomService = await this.roomService.joinRoom(req.body.user_id, req.params.room_id);
            res.status(201).json({
                message: "Join room successfully",
                data: dataFromRoomService
            })
        } catch (error) {
            res.status(500).json({message: "Failed to join room"});
        }
    }

    getRooms = async (req: Request, res: Response) => {
        try {
            const dataFromRoomService = await this.roomService.getRooms();
            res.status(201).json({
                message: "Get all rooms",
                data: dataFromRoomService
            });        
        } catch (error) {
            res.status(500).json({message: "Failed to get all rooms"});
        }
    }

    getRoomById = async (req: Request, res: Response) => {
        try {
            const dataFromRoomService = await this.roomService.getRoomById(req.params.id);
            res.status(200).json({
                message: "Room data retrieved",
                data: dataFromRoomService
            });
        } catch (error) {
            res.status(500).json({message: "Failed to get room data"});
        }
    }

    updateRoom = async (req: Request, res: Response) => {
        try {
            await this.roomService.updateRoom(req.params.id, req.body);
        } catch (error) {
            res.status(500).json({message: `Failed update room ${req.params.id}`});
        }
    }

    removeRoom = async (req: Request, res: Response) => {
        try {
            await this.roomService.removeRoom(req.params.id);
        } catch (error) {
            res.status(500).json({message: `Failed remove room ${req.params.id}`});
        }
    }
}

