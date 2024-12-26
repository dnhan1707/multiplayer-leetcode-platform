"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const api_1 = require("./routes/api");
const app = (0, express_1.default)();
async function startServer() {
    try {
        const PORT = process.env.PORT || 4000;
        app.use((0, cors_1.default)());
        app.use(express_1.default.json());
        app.use("/", api_1.apiRoutes);
        app.listen(PORT, () => {
            console.log(`Server ready at http://localhost:${PORT}`);
        });
    }
    catch (err) {
        console.log("Failed to start server:", err);
        process.exit(1);
    }
}
startServer();
