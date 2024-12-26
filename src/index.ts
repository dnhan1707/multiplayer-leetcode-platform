import express, { Response } from "express";
import cors from "cors";
import { apiRoutes } from "./routes/api";

const app = express();

async function startServer() {
  try {
    const PORT = process.env.PORT || 4000;

    app.use(cors());
    app.use(express.json());

    app.use("/", apiRoutes);

    app.listen(PORT, () => {
      console.log(`Server ready at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log("Failed to start server:", err);
    process.exit(1);
  }
}

startServer();
