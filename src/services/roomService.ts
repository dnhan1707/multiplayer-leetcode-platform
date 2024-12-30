import { Room } from "../models/room";


export class RoomService {
    async createRoom (data: Pick<Room, "room_code" | "created_by" | "status" | "max_players">) {
        return data;
    }
}
