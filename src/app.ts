import express from "express";
import cors from "cors";
import { userRoutes } from "../src/routes/userRoutes";
import { roomRoutes } from "../src/routes/roomRoutes";
import { authRoutes } from "../src/routes/authenticationRoutes";
import { problemRoutes } from "../src/routes/problemRoutes";
import { submissionRoutes } from "./routes/submissionRoutes";

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