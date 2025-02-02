import { Router } from "express";
import { UserService } from "../services/userService";
import { AuthController } from "../controllers/authController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();
const userService = new UserService();
const authController = new AuthController(userService);

router.post("/signup", authController.signUp);
router.post("/login", authController.logIn);
router.get("/logout", authController.logOut);
router.post("/refresh", authController.refreshToken);
router.get("/check", authMiddleware, authController.checkAuth);
export const authRoutes = router;