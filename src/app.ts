import express from "express";
import cors from "cors";
import { userRoutes } from "./routes/userRoutes";
import { roomRoutes } from "./routes/roomRoutes";
import { authRoutes } from "./routes/authenticationRoutes";
import { problemRoutes } from "./routes/problemRoutes";

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,              // Allow cookies to be sent this is needed for client side, since the token frm JWT is set on the cookies
}));
app.use(express.json());
app.use(authRoutes);
app.use(userRoutes);
app.use(roomRoutes);
app.use(problemRoutes);
app.use(submissionRoutes);


export default app;