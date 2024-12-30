import { Room } from "../models/room";

export class RoomService {
    async createRoom(roomData: { size: number; createdBy: string }) {
        try {
            const newRoom = await Room.create({
                max_players: roomData.size,
                created_by: roomData.createdBy,
                status: "waiting",
            });
            return newRoom;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}