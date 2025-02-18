import { Response, Request } from "express";
import { RoomParticipantService } from "../services/roomParticipantService";
import { Server } from "socket.io";

export class RoomParticipantController {
    constructor (private roomParticipantService: RoomParticipantService, private io: Server){
        if (!io) {
            throw new Error('Socket.IO instance is required');
        }
    }

    getUserNameWithRole = async (req: Request, res: Response) => {
        try {
            if(!req.user) {
                return res.status(401).json({message: "Unauthorized"});
            }
            
            const roomCode = req.params.roomCode;
            const dataFromRoomService = await this.roomParticipantService.getUsersWithRoles(roomCode);
            console.log('datafromservece participant: ',dataFromRoomService);
            res.status(200).json({
                message: "Successfully get list of username and roles",
                data: dataFromRoomService // this is an array [{username:..., role:....}, {}, {}, ...]
            })
        } catch (error) {
            res.status(500).json({message: "Failed to get list of username and roles"});
        }
    }

    deleteParticipantFromRoom = async (req: Request, res: Response) => {
        try {
            if(!req.user) {
                return res.status(401).json({message: "Unauthorized"});
            }

            const userId = req.user.id;
            const roomCode = req.params.roomCode;
            const dataFromRoomService = await this.roomParticipantService.deleteRoomParticipant(roomCode, userId);
            this.io.to(roomCode).emit("participantLeft");
            res.status(200).json({
                data: dataFromRoomService
            })
        } catch (error) {
            res.status(500).json({message: "Failed to delete participant from room"});
        }
    }
}