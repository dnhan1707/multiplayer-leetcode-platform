import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare module "express-serve-static-core" {
    interface Request {
        user?: any;
    }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Extract token from HTTP-only cookies
    let token = req.cookies.authToken; 

    // Optionally support Authorization header for API clients
    if (!token && req.header("Authorization")) {
        token = req.header("Authorization")?.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        req.user = decoded; // Attach decoded user data to request
        next();
    } catch (error) {
        return res.status(403).json({ message: "Forbidden - Invalid token" });
    }
};

export default authMiddleware;
