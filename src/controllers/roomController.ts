import { Request, Response } from "express";
import { RoomService } from "../services/roomService";
import { Server } from "socket.io";

export class RoomController {
    constructor (private roomService: RoomService, private io: Server) {
        if (!io) {
            throw new Error('Socket.IO instance is required');
        }
    }
    createRoom = async (req: Request, res: Response) => {
        try {
            if(!req.user) {
                return res.status(401).json({message: "Unauthorized"});
            }

            const userId = req.user.id;
            const { roomSize } = req.body;
            
            const dataFromRoomService = await this.roomService.createRoom({ roomSize, userId });
            res.status(201).json({
                message: "Room created",
                data: dataFromRoomService //This is { newRoom, newParticipant }
            });
        } catch (error) {
            res.status(500).json({message: "Failed to create room"});
        }
    }

    joinRoom = async (req: Request, res: Response) => {
        try {
            // Check if user is authenticated
            if (!req.user) {
                console.log("Unauthorized: No user found in request");
                return res.status(401).json({ message: "Unauthorized" });
            }
    
            const roomCode = req.params.id; 
            const userId = req.user.id;
            
            console.log("Attempting to join room with code:", roomCode);
            console.log("User attempting to join:", userId);
    
            // Emit WebSocket event to notify participants
            if (this.io) {
                this.io.to(roomCode).emit("participantJoined", { userId });
            }    
            const dataFromRoomService = await this.roomService.joinRoom(userId, roomCode);
            
            console.log("Successfully joined room. Data:", dataFromRoomService);
            
            res.status(201).json({
                message: "Join room successfully",
                data: dataFromRoomService
            });
        } catch (error) {
            console.error("Error in joinRoom:", error);
            res.status(500).json({
                message: "Failed to join room",
                error: error
            });
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

