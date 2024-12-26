"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRoutes = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/health", (_, res) => {
    res.json({ status: "ok" });
});
exports.apiRoutes = router;
