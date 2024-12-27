import app from "./app";

async function startServer() {
  try {
    const PORT = process.env.PORT || 4000;

    app.listen(PORT, () => {
      console.log(`Server ready at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log("Failed to start server:", err);
    process.exit(1);
  }
}

startServer();
