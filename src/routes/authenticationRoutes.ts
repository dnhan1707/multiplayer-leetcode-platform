import { Router } from "express";
import { UserService } from "../services/userService";
import { AuthController } from "../controllers/authController";

const router = Router();
const userService = new UserService();
const authController = new AuthController(userService);

router.post("/signup", authController.signUp);
router.post("/login", authController.logIn);
router.get("/logout", authController.logOut);

export const authRoutes = router;