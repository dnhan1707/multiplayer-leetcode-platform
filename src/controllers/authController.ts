import { Request, Response } from "express";
import { UserService } from "../services/userService";


export class AuthController {
    constructor(private userService: UserService) {}

    signUp = async (req: Request, res: Response) => {
        try {
            const { username, email, password } = req.body;
            const { user, token } = await this.userService.signUp({ username, email, password });
            res.status(201).json({ user, token });
        } catch (error) {
            res.status(400).json({ message: error });
        }
    };


    logIn = async (req: Request, res: Response) => {
        try {
          const { email, password } = req.body;
          const { user, token } = await this.userService.logIn(email, password);
          res.status(200).json({ user, token });
        } catch (error) {
          res.status(400).json({ message: error });
        }
    };
}
