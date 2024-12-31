import { Room } from "../models/room";
import { error } from "console";
import { v4 as uuidv4 } from "uuid"; // Install uuid package

export class RoomService {
    async createRoom(data: { size: number, createdBy: string }) {
        try {
            // We may want to check if creator Id already in the db
            const roomLink = await this.generateRoomLink();
            const newRoom = await Room.create({
                room_link: roomLink,
                max_players: data.size,
                created_by: data.createdBy,
                status: "waiting",
            });
            return newRoom;
        } catch (error) {
            console.log("Cannot create room: ",error);
            throw error;
        }
    }


    async getRooms() {
        try {
            const allRoom = await Room.findAll();
            return allRoom;
        } catch (error) {   
            console.log(`Cannot find all room`);
            throw error;
        }
    }

    async getRoomById(id: string) {
        try {
            const roomData = await Room.findByPk(id);
            return roomData;
        } catch (error) {
            console.log(`Cannot find room ${id}`, error);
            throw error
        }
    }

    async updateRoom(
        id: string,
        data: Partial<{ status: string, max_players: number}>
    ) {
        try {
            const room = await Room.findOne({where: {room_id: id}});
            if(!room) {
                throw error("Room not found")
            }

            await room.update(data);
        } catch (error) {
            throw new Error("Error updating room: " + error);
        }

    }


    async removeRoom(id: string) {
        try {
            const room = await Room.findOne({where: {room_id: id}});
            if(!room) {
                throw error("Room not found")
            }
            await room.destroy();
        } catch (error) {
            console.log(`Cannot remove room ${id}: `, error)
        }
    }

    private async isRoomCodeUnique(roomCode: string): Promise<boolean> {
        const existingRoomCode = await Room.findOne({
            where: {
                room_code: roomCode,
                status: "active"
            }
        });
        return !existingRoomCode;
    }

    private async generateUniqueRoomCode(): Promise<string> {
        let roomCode = "";
        let isUnique = false;

        while(!isUnique){
            roomCode = uuidv4().substring(0, 5).toUpperCase();
            isUnique = await this.isRoomCodeUnique(roomCode);
        }

        return roomCode;
    }

    private async generateRoomLink(): Promise<string> {
        const roomCode = await this.generateUniqueRoomCode();
        return `http://localhost:4000${roomCode}`
    }
}