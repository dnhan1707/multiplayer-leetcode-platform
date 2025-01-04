import { Room } from "../models/room";
import { RoomParticipant } from "../models/roomParticipant";
import { v4 as uuidv4 } from "uuid"; // Install uuid package
import { User } from "../models/user";

export class RoomService {
    async createRoom(data: { roomSize: number, userId: string }) {
        try {
            console.log("Passed creatorId: ", data.userId);
            const creator = await User.findByPk(data.userId);
            if (!creator) {
                throw new Error("Creator not found");
            }

            const roomLinkCode = await this.generateRoomLink();
            const newRoom = await Room.create({
                room_link: roomLinkCode.roomLink,
                room_code: roomLinkCode.roomCode,
                max_players: data.roomSize,
                created_by: data.userId,
                status: "waiting",
            });

            // Add the creator as a participant in the room
            await this.joinRoom(data.userId, newRoom.id);

            return newRoom;
        } catch (error) {
            console.log("Cannot create room: ",error);
            throw error;
        }
    }

    async joinRoom(userId: string, roomId: string) {
        try {
            const room = await Room.findByPk(roomId);
            if (!room) {
                throw new Error("Room not exists");
            }

            switch (room.status) {
                case "ready":
                    throw new Error("Room is full");
                case "playing":
                    throw new Error("Room is playing");
                case "finished":
                    throw new Error("Room is finished but not eliminated yet");
            }

            const alreadyParticipant = await RoomParticipant.findOne({
                where: { user_id: userId, room_id: roomId }
            });

            if (alreadyParticipant) {
                throw new Error("User is already a participant in another Room");
            }

            const newParticipant = await RoomParticipant.create({
                user_id: userId,
                room_id: roomId,
                joined_at: new Date()
            });

            const participantCount = await RoomParticipant.count({
                where: {room_id: roomId}
            })
            if(participantCount >= room.max_players) {
                await room.update({ status: "ready" })
            }

            return newParticipant;
        } catch (error) {
            console.log(`User ${userId} couldn't join room: ${roomId}`);
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
                throw new Error("Room not found")
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
                throw new Error("Room not found")
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

    private async generateRoomLink() {
        const roomCode = await this.generateUniqueRoomCode();
        return {roomLink: `http://localhost:4000${roomCode}`, roomCode: roomCode};
    }
}