import { Request, Response } from "express";
import { UserService } from "../services/userService";

import jwt from "jsonwebtoken"


export class AuthController {
    constructor(private userService: UserService) {}

    signUp = async (req: Request, res: Response) => {
        try {
            const { username, email, password } = req.body;
            const { user, token, refreshToken } = await this.userService.signUp({ username, email, password });
    
            res.setHeader("Set-Cookie", [
                `authToken=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Domain=localhost`,
                `refreshToken=${refreshToken}; Path=/; HttpOnly; Secure; SameSite=Strict; Domain=localhost`
            ]);
    
            res.status(201).json({ user });
        } catch (error) {
            res.status(400).json({ message: error });
        }
    };
    

    logIn = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const { user, token, refreshToken } = await this.userService.logIn(email, password);
    
            res.setHeader("Set-Cookie", [
                `authToken=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Domain=localhost`,
                `refreshToken=${refreshToken}; Path=/; HttpOnly; Secure; SameSite=Strict; Domain=localhost`
            ]);
    
            res.status(200).json({ user });
        } catch (error) {
            res.status(400).json({ message: error });
        }
    };
    

    logOut = async (req: Request, res: Response) => {
        try {
            res.setHeader("Set-Cookie", [
                "authToken=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0",
                "refreshToken=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0"
            ]);
    
            res.status(200).json({ message: "Logged out successfully" });
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    };
    

    refreshToken = async (req: Request, res: Response) => {
        try {
            const refreshToken = req.cookies.refreshToken; // ✅ Get token from HTTP-only cookie
            if (!refreshToken) return res.status(401).json({ message: "Unauthorized" });
    
            jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!, (err: any, decoded: any) => {
                if (err) return res.status(403).json({ message: "Invalid refresh token" });
                const accessToken = this.userService.generateToken(decoded.id);
                res.json({ accessToken });
            });
        } catch (error) {
            res.status(400).json({ message: error });
        }
    };

    checkAuth = async (req: Request, res: Response) => {
        try {
            res.status(200).json({ message: "Authenticated", user: req.user })
        } catch (error) {
            res.status(400).json({ message: error });
        }
    }
    
}