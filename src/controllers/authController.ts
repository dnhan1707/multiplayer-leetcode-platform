import { Request, Response } from "express";
import { UserService } from "../services/userService";

export class AuthController {
    constructor(private userService: UserService) {}

    signUp = async (req: Request, res: Response) => {
        try {
            const { username, email, password } = req.body;
            const { user, token } = await this.userService.signUp({ username, email, password });
            res.setHeader('Set-Cookie', `authToken=${token}; Path=/; HttpOnly; SameSite=Lax; Domain=localhost`);
            res.status(201).json({ user, token });
        } catch (error) {
            res.status(400).json({ message: error });
        }
    };

    logIn = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const { user, token } = await this.userService.logIn(email, password);
            res.setHeader('Set-Cookie', `authToken=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Domain=localhost`);
            res.status(200).json({ user, token });
        } catch (error) {
            res.status(400).json({ message: error });
        }
    };

    logOut = async (req: Request, res: Response) => {
        try {
            res.clearCookie("authToken");
            res.status(200).json({ message: "Cookies deleted" });
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    };
}