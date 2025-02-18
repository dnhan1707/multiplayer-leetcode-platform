import express from "express";
import cors from "cors";
import { userRoutes } from "./routes/userRoutes";
import { roomRoutes } from "./routes/roomRoutes";
import { roomParticipantRoutes } from "./routes/roomParticipantRoutes";
import { authRoutes } from "./routes/authenticationRoutes";
import { problemRoutes } from "./routes/problemRoutes";
import { submissionRoutes } from "./routes/submissionRoutes";
import cookieParser from "cookie-parser";

const app = express();

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:3000", // Ensure this matches frontend
        credentials: true, // Needed for HTTP-only cookies
    })
);

// Apply only public routes here (No auth required)
app.use(authRoutes);

// Apply protected routes separately
app.use(userRoutes);

app.use(problemRoutes);
app.use(submissionRoutes);

export default app;
