import express from "express";
import cors from "cors";
import { userRoutes } from "./routes/userRoutes";
import { roomRoutes } from "./routes/roomRoutes";
import { authRoutes } from "./routes/authenticationRoutes";

const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // Client origin
    credentials: true,              // Allow cookies to be sent
}));
app.use(express.json());
app.use(authRoutes);
app.use(userRoutes);
app.use(roomRoutes);

export default app;