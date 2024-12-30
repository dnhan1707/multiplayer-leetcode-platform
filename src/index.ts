import app from "./app";
import { sequelize } from "./config/database";

async function startServer() {
  try {
    const PORT = process.env.PORT || 4000;

    await sequelize.sync();
    console.log("Database synchronized");


    app.get("/", (req, res) => {
      try {
        res.status(200).json({ message: "Connected" });
      } catch (error) {
        res.status(500).json({ message: "Internal server error" });
      }
    })

    app.listen(PORT, () => {  
      console.log(`Server ready at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log("Failed to start server:", err);
    process.exit(1);
  }
}

startServer();
