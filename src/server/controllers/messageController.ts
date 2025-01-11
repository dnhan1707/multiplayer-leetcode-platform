import { Request, Response } from "express";
import { MessageService } from "../services/messageService";


export class MessageController {
    constructor(private messageService: MessageService) {}

    getMessages = async (req: Request, res: Response) => {
        try {
            const messages = await this.messageService.getMessages(req.params.id);
            res.status(200).json(messages);
        } catch (error) {
            res.status(500).json({ message: "Failed to get messages" });
        }
    }
}
