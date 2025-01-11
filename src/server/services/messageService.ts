import { Message } from "../models/message";


export class MessageService {
    async saveMessage(roomId: string, userId: string, message: string) {
        return Message.create({
            room_id: roomId,
            user_id: userId,
            message_content: message,
            sent_at: new Date()
        })
    }

    async getMessages(roomId: string) {
        return Message.findAll({
            where: {room_id: roomId},
            order: [["sent_at", "ASC"]]
        })
    }
}
